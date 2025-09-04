'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import faqGirlDog1x from '../../public/Images/faq-girl-dog-desktop@1x.png';
import faqGirlDog2x from '../../public/Images/faq-girl-dog-desktop@2x.png';
import Image from 'next/image';
import Icon from './Icon';

export default function Faq() {
  return (
    <div
      id="faq"
      className="w-full scroll-mt-24 flex flex-col lg:flex-row gap-3 justify-between items-center lg:items-start py-22 lg:pt-[24px] lg:pb-[148px]"
    >
      <div className="hidden lg:block">
        <picture className="">
          <source
            media="(min-width: 1440px)"
            srcSet={`${faqGirlDog1x} 1x, ${faqGirlDog2x} 2x`}
          />
          <Image src={faqGirlDog1x} alt="girl with dog" className="" />
        </picture>
      </div>

      <div className="w-full lg:w-[730px]">
        <div className="flex flex-row items-center justify-between lg:mb-10 mb-3 lg:px-6 lg:pt-10">
          <h3 className="lg:text-[40px] text-[26px] font-semibold leading-[140%] text-center">
            FAQ
          </h3>
          <div className="lg:hidden bg-[url('../../public/Images/faq-girl-dog-mob@1x.png')] w-[251px] h-[40px] overflow-hidden rounded-[24px] bg-position-[50%_50%] bg-size-[100%]"></div>
        </div>
        <hr className="w-full h-px border-none bg-[#C9E2F8]" />
        <Accordion
          variant="light"
          fullWidth
          className="!px-0
          [&>hr]:bg-[#C9E2F8] [&>hr]:h-px [&>hr]:border-none
          [&_[data-slot='trigger']]:py-10 
          [&_[data-slot='trigger']]:px-6"
        >
          {[
            {
              key: '1',
              title: 'Як проходить онлайн-консультація?',
              content: [
                '1. Заповніть форму з питаннями, оберіть дату прийому',
                '2. Із запропонованого списку оберіть ветеринара та бажаний час прийому',
                '3. Оплатіть консультацію та очікуйте на підтвердження ветеринаром',
                '4. Після підтвердження на вказаний вами E-mail прийде посилання на консультацію',
              ],
            },
            {
              key: '2',
              title: 'Коли буде корисна онлайн-консультація?',
              content: [
                '1. Немає можливості звернутися до клініки, а стан здоров’я улюбленця викликає занепокоєння',
                '2. Потрібні уточнення по догляду або щодо профілактичних обробок вашого улюбленця',
                '3. Ви перебуваєте за кордоном, але через мовний бар`єр важко порозумітися з місцевим ветеринаром',
                '4. Консультація за кордоном є дорожчою',
              ],
            },
            {
              key: '3',
              title: 'Як проходить оплата?',
              content: [
                'Після обрання ветеринара і часу прийому вкажіть своє ім’я та email. Здійсніть оплату зручним для вас способом (Mastercard, Visa, ApplePay). Ваша оплата зберігається на рахунку сервісу та буде переведена ветеринару після завершення консультації',
              ],
            },
            {
              key: '4',
              title: 'Якщо я хочу скасувати консультацію?',
              content: [
                'Ви можете скасувати консультацію не пізніше ніж за 1 годину перед її початком. Кошти повернуться на банківську картку згідного з умовами обслуговування вашого банку. Якщо ви скасовуєте консультацію пізніше ніж за 1 годину, кошти не повертаються',
              ],
            },
          ].map(({ key, title, content }) => (
            <AccordionItem
              key={key}
              aria-label={`Accordion ${key}`}
              title={
                <span className="font-lato font-medium lg:text-[24px] text-[16px] text-gray-900 leading-[140%]">
                  {title}
                </span>
              }
              indicator={({ isOpen }) => (
                <Icon
                  sprite="/sprites/sprite-sistem.svg"
                  id={isOpen ? 'icon-minus' : 'icon-plus'}
                  width="24px"
                  height="24px"
                  className="fill-primary !rotate-90"
                />
              )}
            >
              <ol className="lg:pb-10 lg:px-6">
                {content.map((item, index) => (
                  <li
                    key={index}
                    className="mb-3 font-lato font-normal lg:text-[16px] text-[14px] text-gray-600 leading-[140%]"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
