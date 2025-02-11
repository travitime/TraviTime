import { prisma } from '@/lib/prisma'
import { NextResponse } from "next/server";


export async function POST(request: Request) { 


    try {
        const user = await prisma.user.upsert({
            where: {
                clerkId: 'clerkId'
            },
            update: {
                email: 'email',
                name: `${first_name || ''} ${last_name || ''}`.trim() || username || '',
            },
            create: {
                clerkId: id,
                email: primaryEmail,
                name: `${first_name || ''} ${last_name || ''}`.trim() || username || '',
                role: 'AGENT', // Default role for now
                accountType: 'FREE'
            },
        })
    } catch (error) {
        
    }

}