import React from 'react';
import BrandLogo from './brand-logo';
import NavigationMenu from './navigation-menu';
import HeaderAside from './header-aside';

const HeaderApp: React.FC = () => {
    return (
        <header className="flex fixed w-full top-0 h-16 justify-between items-center p-4 bg-gradient-to-r from-purple-900 via-orange-500 to-yellow-300 rounded-bl-3xl rounded-br-3xl">
            <div className="flex items-center">
                <BrandLogo src="/app-assets/brand-logo.png"/>
                <NavigationMenu />
            </div>
            <div className="flex items-center">
                <HeaderAside />
            </div>
        </header>
    );
};

export default HeaderApp;