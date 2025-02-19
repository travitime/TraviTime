import Image from 'next/image';

const BrandLogo = ({src}:{src:string} ) => {
    return (
        <div className="flex items-center justify-center">
            <Image
                src={src}
                alt="Brand Logo"
                width={111}
                height={24}
            />
        </div>
    );
};

export default BrandLogo;