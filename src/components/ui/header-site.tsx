import React from 'react';
import BrandLogo from './brand-logo';
import NavigationMenuSite from './navigation-menu-site';
import HeaderSiteAside from './header-site-aside';

const HeaderSite: React.FC = () => {
    return (
        <header className="flex fixed w-full top-0 h-16 justify-between items-center p-4 bg-white rounded-bl-3xl rounded-br-3xl">
            <div className="flex items-center justify-between w-full">
                <BrandLogo src="/site-assets/brand-logo.png"/>
                <NavigationMenuSite />
                <HeaderSiteAside />
            </div>
            
        </header>
    );
};

export default HeaderSite;