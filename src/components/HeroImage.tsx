import Image from "next/image";
import girlDogImageDesktop from "../../public/Images/girl-dog-desktop.jpg";

export default function HeroImage() {
  return (
    <div className="hidden bg-background  md:block pt-[24px] pb-[18px]">
      <Image
        className="block rounded-[40px] object-cover w-full h-full md:min-w-[704px] md:h-[358px] 2xl:max-w-[1294px]"
        src={girlDogImageDesktop}
        width={1440}
        alt="girl&dog"
        priority
      />
    </div>
  );
}
