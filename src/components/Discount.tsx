import Link from 'next/link';
import Image from 'next/image';
import vector from '../assets/Images/vector.png';
import vectorArrowHeart from '../assets/Images/vector-arrow-heart.png';
import bunny from '../assets/Images/bunny.gif';
import { Button } from '@heroui/react';

export default function Discount() {
  return (
    <div className="pt-[84px] pb-[88px]lg:pt-[64px] lg:pb-[129px]">
      <div className="w-full bg-primary rounded-3xl px-[36px] pt-[40px] pb-[24px] lg:pt-[60px] lg:pb-[48px] lg:pl-[111px] lg:pr-[45px]">
        <div className="relative flex items-center justify-center lg:justify-between">
          <div className="relative flex flex-col items-center justify-center lg:items-start">
            <h3 className="text-white text-[18px] lg:text-[32px] font-semibold uppercase leading-[140%] text-center w-[280px] mb-[24px] lg:mb-[40px] lg:w-[590px] lg:text-left">
              Реєструйся та отримуй знижку -10%{' '}
              <span className="hidden lg:inline">на першу консультацію</span>
            </h3>
            <Link href={'/signup'}>
              <Button
                type="submit"
                radius="sm"
                size="sm"
                className="bg-white text-primary w-full inline-flex justify-center text-[16px] py-3 px-13 lg:text-[18px] lg:w-[226px] lg:h-[48px]"
              >
                Зареєструватися
              </Button>
            </Link>
            <div className="hidden lg:inline-block absolute top-[80px] right-[-25px]">
              <Image
                src={vectorArrowHeart.src}
                alt="arrow heart"
                width={150}
                height={45}
              />
            </div>
          </div>
          <div>
            <Image
              src={vector}
              alt="fish"
              width={140}
              height={40}
              className="hidden xl:block absolute bottom-[-25px] right-0 w-[240px] h-[80px] rotate-6"
            />
          </div>
          <div className="absolute top-[-105px] right-[-29px] w-[81px] h-[93px] lg:bottom-[-35px] lg:right-0 lg:w-[272px] lg:h-[309px]">
            <Image src={bunny} alt="bunny logo" width={272} height={309} />
          </div>
        </div>
      </div>
    </div>
  );
}
