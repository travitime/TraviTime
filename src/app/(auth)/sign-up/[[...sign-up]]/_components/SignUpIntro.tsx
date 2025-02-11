import { Globe, Scale, Zap } from "lucide-react";
import Image from "next/image";
export default function SignUpIntro() {
  const FeatureItem = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex items-start gap-4">
        <div className="bg-orange-500 p-3 rounded-lg">{icon}</div>
        <div>
          <h4 className="text-[18px] font-semibold text-gray-000">{title}</h4>
          <p className="text-[16px] text-gray-500">{description}</p>
        </div>
      </div>
    );
  };
  return (
    <section className=" px-6">
      <div className="max-w-3xl mx-auto ">
        <h2 className="text-[30px] font-semibold text-gray-800">
          Modernising travel and elevating experiences with{" "}
          <span className="font-bold italic">
            <Image
              src={"/site-assets/brand-logo.png"}
              alt=""
              width={111}
              height={24}
            />
          </span>
        </h2>
      </div>

      <div className="mt-10 max-w-2xl mx-auto space-y-6">
        <FeatureItem
          icon={<Globe className="w-6 h-6 text-white" />}
          title="Global audience"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
        />
        <FeatureItem
          icon={<Scale className="w-6 h-6 text-white" />}
          title="Enhancing efficiency"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
        />
        <FeatureItem
          icon={<Zap className="w-6 h-6 text-white" />}
          title="Offer lightening speed support"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
        />
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-gray-600 font-medium text-lg">Trusted by</h3>
        <div className="flex justify-center gap-8 mt-4 opacity-70">
          <span className="font-bold text-gray-700">TUPLE</span>
          <span className="font-bold text-gray-700">Mirage</span>
          <span className="font-bold text-gray-700">StaticKit</span>
        </div>
      </div>
    </section>
  );
}
