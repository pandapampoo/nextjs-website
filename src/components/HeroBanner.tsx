import Image from "next/image";
export interface IHeroBannerProps {
}

const HeroBanner: React.FunctionComponent<IHeroBannerProps> = (props) => {
  return (
    <div className="my-10">
      <Image src="/images/dummy/hero-banner.jpg"  width={1500} height={500} alt="banner" className="w-full rounded-md" priority/>
    </div>
  );
}

export default HeroBanner