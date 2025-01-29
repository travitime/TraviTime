import React from 'react';
import { Search, Settings, Bell, User } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const TopBarNavigation = () => {
  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Customers', href: '/customers' },
    { label: 'Itineraries', href: '/itineraries' },
    { label: 'Quotes', href: '/quotes' },
    { label: 'Payments', href: '/payments' },
    { label: 'Documents', href: '/documents' },
    { label: 'Communication hub', href: '/communication' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-amber-400 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-white text-2xl font-bold">TRAWEIO</h1>
          
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm ${
                  item.active 
                    ? 'text-white font-semibold' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-white/80 hover:text-white cursor-pointer" />
          <Settings className="w-5 h-5 text-white/80 hover:text-white cursor-pointer" />
          <Bell className="w-5 h-5 text-white/80 hover:text-white cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBarNavigation;