import { featuresList } from "./Constants";
import Icon from "../Icon";

export default function Features() {
  return (
    <ul
      id="features"
      className="scroll-mt-24 flex flex-col gap-[48px] pt-[92px] pb-[88px] 2xl:pb-[104px] 2xl:flex-row bg-background 2xl:gap-[0px] w-full">
      {featuresList.map(item => {
        return (
          <li
            key={item.id}
            className="flex flex-col items-center w-full px-[20px] custom-after 2xl:w-[431px] 2xl:px-[48px] 2xl:items-start relative border-r-[1px] border-r-primary-300 flex-grow">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id={item.id}
              width="72px"
              height="59px"
              className="mb-[24px] custom-after"
            />
            <h3 className="uppercase text-[18px] mb-[6px] font-[600] leading-[1.4] text-gray-900 ">
              {item.title}
            </h3>
            <p className="text-[14px] md:text-[16px] font-[400] leading-[1.4] text-gray-700 text-center 2xl:text-left">
              {item.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
