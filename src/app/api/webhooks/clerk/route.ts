// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserRole, AuthProvider } from '@prisma/client'

async function handler(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, username, first_name, last_name } = evt.data;

    const primaryEmail = email_addresses[0]?.email_address;

    if (!primaryEmail) {
      return new Response('No email address found', {
        status: 400
      });
    }

    try {
      const user = await prisma.user.upsert({
        where: { providerId: id },
        update: {
          email: primaryEmail,
          name: `${first_name || ''} ${last_name || ''}`.trim() || username || '',
        },
        create: {
          providerId: id,
          email: primaryEmail,
          name: `${first_name || ''} ${last_name || ''}`.trim() || username || '',
          role: UserRole.AGENT,
          authProvider: AuthProvider.CLERK
        },
      });

      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      console.error('Error upserting user:', error);
      return new Response('Error occurred while creating/updating user', {
        status: 500
      });
    }
}
  return new Response('Webhook received', { status: 200 });
}

export const POST = handler;