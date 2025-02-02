import Image from 'next/image';

const BrandLogo: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <Image
                src="/app-assets/brand-logo.png"
                alt="Brand Logo"
                width={111}
                height={24}
            />
        </div>
    );
};

export default BrandLogo;