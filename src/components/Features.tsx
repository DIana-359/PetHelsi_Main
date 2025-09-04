import Icon from "./Icon";

export default function Features() {
  return (
    <ul
      id="features"
      className="flex flex-col gap-[48px] pt-[92px] pb-[88px] 2xl:pb-[104px] 2xl:flex-row bg-background 2xl:gap-[0px] w-full">
      <li className="flex flex-col items-center w-full px-[20px] custom-after 2xl:w-[431px] 2xl:px-[48px] 2xl:items-start relative border-r-[1px] border-r-primary-300 flex-grow">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-Landings-illustrations"
          width="72px"
          height="59px"
          className="mb-[24px] custom-after"
        />
        <h3 className="uppercase text-[18px] mb-[6px] font-[600] leading-[1.4] text-gray-900 ">
          завжди поруч
        </h3>
        <p className="text-[14px] font-[400] leading-[1.4] text-gray-700 text-center 2xl:text-left">
          Ветеринари PetHelsi на звʼязку 24/7. Отримайте кваліфіковану
          консультацію в будь-якому місці у будь-який час
        </p>
      </li>

      <li className="flex flex-col items-center w-full px-[20px] custom-after 2xl:w-[431px] 2xl:px-[48px] 2xl:items-start relative border-r-[1px] border-r-primary-300 flex-grow">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-Landings-illustrations2"
          width="72px"
          height="59px"
          className="mb-[24px] custom-after"
        />
        <h3 className="uppercase text-[18px] mb-[6px] font-[600] leading-[1.4] text-gray-900 ">
          швидкий запис
        </h3>
        <p className="text-[14px] font-[400] leading-[1.4] text-gray-700 text-center 2xl:text-left">
          Лише декілька кліків, і ви записані на прийом до обраного ветеринара
          без зайвих очікувань
        </p>
      </li>

      <li className="flex flex-col items-center w-full px-[20px] custom-after 2xl:w-[431px] 2xl:px-[48px] 2xl:items-start relative border-r-[1px] border-r-primary-300 2xl:border-r-transparent flex-grow">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-Landings-illustrations3"
          width="72px"
          height="59px"
          className="mb-[24px] custom-after"
        />
        <h3 className="uppercase text-[18px] mb-[6px] font-[600] leading-[1.4] text-gray-900 ">
          Досвідчені ветеринари
        </h3>
        <p className="text-[14px] font-[400] leading-[1.4] text-gray-700 text-center 2xl:text-left">
          Наша база складається із кваліфікованих ветеринарів. Оберіть того, хто
          найбільше відповідає вашим вимогам!
        </p>
      </li>
    </ul>
  );
}
