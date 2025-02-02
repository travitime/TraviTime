'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Utility function for class merging (optional)

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function NavBar() {
  return (
    <NavigationMenu.Root className="relative flex justify-center">
      <NavigationMenu.List className="flex space-x-4  p-3 ">
        {navItems.map((item) => (
          <NavigationMenu.Item key={item.href}>
            <NavigationMenu.Link asChild>
              <Link
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-md text-white hover:bg-gray-100 transition'
                )}
              >
                {item.name}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}