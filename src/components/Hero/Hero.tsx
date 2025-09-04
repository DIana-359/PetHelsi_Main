import Image from "next/image";
import dog from "../../../public/Images/dog.gif";
import vector from "../../../public/Images/vector.png";
import { VeterinarianSearchForm } from "./VeterinarianSearchForm";

export default function Hero() {
  return (
  <div className="w-full relative">
    <div className="mt-4 md:mt-6 bg-primary rounded-2xl p-6 md:px-12 xl:px-20 md:py-16">
      <div className="flex flex-col gap-6 text-white pl-1">
      <div className="flex flex-row flex-wrap items-center text-[32px] lg:text-[64px] uppercase gap-x-4 md:gap-x-6">
        <p>Ветеринарна</p>
        <div className="order-3 md:order-4 text-[16px] lg:text-[32px] px-6 border border-white rounded-3xl">24/7</div>
        <p className="order-2">онлайн</p>
        <p className="order-4 md:order-3">консультація</p>
      </div>
      
          <p className="text-[14px] lg:text-[20px] lg:max-w-[535px] pb-8 lg:pb-[64px]">
            Новий рівень турботи про здоров&#39;я вашого улюбленця.
            Де б ви не були, ми завжди поруч!
          </p>
      </div>
          
      <VeterinarianSearchForm />
      
      <div className="absolute bottom-14 lg:top-32 right-12">
      <div className="relative ">
        <Image
          src={vector}
          alt="dog"
          width={270}
          className="hidden xl:block absolute bottom-0 h-auto"
        />
        <Image
          src={dog}
          width={255}
          priority
          alt="dog logo"
          className="hidden xl:block scale-x-[-1]"
          unoptimized
        />
      </div>
      </div>
    </div>
  </div>
  )
}
