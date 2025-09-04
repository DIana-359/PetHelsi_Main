"use client";

import Image from "next/image";
import consultationImg2x from "../../public/Images/online-consultation@2x.png";
import vector from "../../public/Images/Vector-circle.png";
import cat from "../../public/Images/cat.gif";

export default function AppointmentProcess() {
  return (
    <div
      id="appointment"
      className="lg:grid grid-cols-12 mb-22 w-full gap-6 items-stretch items-center justify-center pt-4 pb-14 overflow-hidden"
    >
      <div className="hidden col-span-5 lg:block rounded-3xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            className="block w-full h-full object-cover"
            src={consultationImg2x}
            alt="Appointment Image"
          />
        </div>
      </div>
      <div className="relative lg:col-span-7 pt-8 xl:pt-[104px] pb-10 xl:pmb-26 pl-8 xl:pl-18 pr-6 bg-primary-700 rounded-3xl">
        <h2 className="text-3xl xl:text-[40px] font-semibold text-white mb-8 xl:mb-12 uppercase">
          Записуйтеся <br className="sm:hidden lg:inline" /> на консультацію легко!
        </h2>
        <ul className="flex flex-col gap-6 lg:gap-8">
          <li className="flex gap-5 lg:gap-8 items-start">
            <p className="text-5xl xl:text-[50px] font-medium leading-14 text-primary-500">
              1
            </p>
            <div>
              <h3 className="text-lg xl:text-2xl font-medium text-white mb-1 lg:mb-2">
                Заповніть форму
              </h3>
              <p className="text-sm xl:text-base font-normal text-white">
                Оберіть: вид тварини і те, що її турбує та зручну дату
                <br className="hidden lg:inline" /> прийому.
                Система автоматично підбере доступних
                <br className="hidden lg:inline" /> ветеринарів
              </p>
            </div>
          </li>
          <li className="flex gap-4 lg:gap-6 items-start lg:pr-43">
            <p className="text-5xl xl:text-[50px] font-medium leading-14 text-primary-500">
              2
            </p>
            <div>
              <h3 className="text-lg xl:text-2xl font-medium text-white mb-1">
                Оберіть ветеринара
              </h3>
              <p className="text-sm xl:text-base font-normal text-white">
                Визначте ветеринара, який ідеально вам підходить серед запропонованих системою
              </p>
            </div>
          </li>
          <li className="flex gap-4 lg:gap-6 items-start">
            <p className="text-5xl xl:text-[50px] font-medium leading-14 text-primary-500">
              3
            </p>
            <div>
              <h3 className="xl:hidden text-lg font-medium text-white mb-1">
                Сплатіть консультацію
              </h3>
              <h3 className="hidden xl:inline text-2xl font-medium text-white mb-1">
                Сплатіть для отримання консультації
              </h3>
              <p className="text-sm xl:text-base font-normal text-white pr-43">
                Наша платформа підтримує різні платіжні системи.
                Здійсніть оплату та проконсультуйтеся з ветеринаром
              </p>
            </div>
          </li>
        </ul>

        <div className="hidden lg:block absolute lg:-bottom-[30px] lg:-right-[45px] lg:w-[257px] lg:h-[180px]">
          <Image
              src={vector}
              alt="Pen Circle"
            />
        </div>
        <div className="absolute -bottom-[49px] lg:-bottom-[15px] right-1 lg:-right-[19px] w-[98px] h-[136px] lg:w-[230px] lg:h-[321px]">
          <Image
            src={cat}
            alt="Cat GIF"
          />
        </div>
      </div>
    </div>
  );
}
