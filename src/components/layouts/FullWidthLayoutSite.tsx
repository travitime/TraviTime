import React from 'react';
import HeaderSite from '../ui/header-site';

interface FullWidthLayoutProps {
    children: React.ReactNode;
}

const FullWidthLayout: React.FC<FullWidthLayoutProps> = ({ children }) => {
    return (
        <div>
            <HeaderSite/>
            <main className='mt-16'>{children}</main>
        </div>
    );
};

export default FullWidthLayout;