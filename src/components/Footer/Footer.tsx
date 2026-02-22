import { FormFooter } from "./FormFooter";
import { CopyrightFooter } from "./CopyrightFooter";
import { LogoFooter } from "./LogoFooter";
import { ForuserFooter } from "./ForuserFooter";
import { ImgFooter } from "./ImgFooter";

export default function Footer() {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center relative w-full bg-primary-800 px-4 pt-10 md:px-10  rounded-tl-3xl rounded-tr-3xl ">
        <div className="w-full flex flex-col-reverse md:flex-row gap-6 justify-between text-white pb-8 md:pb-12">
          <div className="flex flex-col order-2 pb-10 -mt-1 md:pb-0 md:order-1">
            <LogoFooter />
            <ImgFooter />
          </div>
          <div className="flex flex-row justify-between md:gap-[120px] md:px-6 lg:gap-[120px] shrink-3 order-1 pb-14 md:pb-0 lg:pb-0 lg:order-2 lg:px-6">
            <ForuserFooter />
          </div>
          <div className="w-full md:w-[224px] lg:w-[352px] order-3 lg:order-3">
            <FormFooter />
          </div>
        </div>
        <CopyrightFooter />
      </div>
    </div>
  );
}
