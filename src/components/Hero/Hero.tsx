import Image from "next/image";
import dog from "../../../public/Images/dog.gif";
import vector from "../../../public/Images/vector.png";
import { VeterinarianSearchForm } from "./VeterinarianSearchForm";

export default function Hero() {
  return (
    <div className="w-full relative">
      <div className="mt-4 md:mt-6 bg-primary rounded-2xl p-6 md:px-12 xl:px-20 md:py-16">
        <div className="flex flex-col gap-6 text-white min:pl-[16px] xs:pl-0">
          <div className="flex flex-row flex-wrap items-center text-[32px] md:text-[48px] 2xl:text-[64px] font-[500] leading-[1.3] tracking-[0.01em] uppercase gap-x-4 w-full xs:w-[480px] md:w-[650px] xl:w-[782px]">
            <p>Ветеринарна</p>
            <div className="order-2 md:order-4 text-[16px] rounded-[40px] lg:text-[32px] py-[4px] px-[36px] lg:py-[1px] lg:px-[24px] border border-white">
              24/7
            </div>
            <p className="order-3">онлайн</p>
            <p className="order-4 md:order-3">консультація</p>
          </div>

          <p className="w-full min:pr-[20px] xs:pr-0 xs:ml-0 text-[14px] lg:text-[20px] pb-8 lg:pb-[64px] font-[400] leading-[1.35] lg:leading-[1.5] tracking-[0.02em]">
            Новий рівень турботи про здоров&#39;я вашого улюбленця.{" "}
            <br className="hidden xs:block" /> Де б ви не були, ми завжди поруч!
          </p>
        </div>

        <VeterinarianSearchForm />

        <div className="absolute bottom-43 right-16 xl:right-24">
          <div className="relative ">
            <Image
              src={vector}
              alt="dog"
              width={270}
              className="hidden lg:block absolute bottom-0 h-auto"
            />
            <Image
              src={dog}
              width={255}
              priority
              alt="dog logo"
              className="hidden lg:block scale-x-[-1]"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
