import React from 'react';
import HeaderApp from '../ui/header-app';

interface FullWidthLayoutProps {
    children: React.ReactNode;
}

const FullWidthLayout: React.FC<FullWidthLayoutProps> = ({ children }) => {
    return (
        <div>
            <HeaderApp />
            <main className='mt-16'>{children}</main>
        </div>
    );
};

export default FullWidthLayout;