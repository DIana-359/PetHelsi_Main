import { Veterinarian } from "@/utils/types/veterinarian";
import Icon from "../Icon";
import { useState } from "react";

type Props = {
  veterinarian: Veterinarian;
};

const petTypeIcons: Record<string, string> = {
  Собака: "icon-dog",
  Кіт: "icon-cat",
  Птах: "icon-bird",
  Гризун: "icon-rabbit",
  Плазун: "icon-turtle",
  Інше: "icon-other",
};

const petTypePlural: Record<string, string> = {
  Собака: "Собаки",
  Кіт: "Коти",
  Птах: "Птахи",
  Гризун: "Гризуни",
  Плазун: "Плазуни",
};

const issueTypeIcons: Record<string, string> = {
  "Блохи/кліщі": "icon-insects",
  "Харчовий розлад": "icon-eating-disorder",
  "Шкірні/вушні інфекції": "icon-skin-infection",
  "Травмування частин тіла": "icon-bones",
  "Догляд та утримання": "icon-care",
  Інше: "icon-other",
  "Проблеми з очима": "icon-eye-problems",
  "Алергічна реакція": "icon-allergy",
  "Проблеми із травленням": "icon-digestive-problems",
};

const AboutTab = ({ veterinarian }: Props) => {
  const [showFullText, setShowFullText] = useState(false);

  const fullText = veterinarian.description;
  const shortText = fullText.slice(0, 150) + "...";

  return (
    <div className="flex flex-col gap-8 mb-8 text-gray-900">
      <div>
        <h3 className="text-[16px]  md:text-[18px] lg:text-[18px] font-semibold mb-4">
          Про мене
        </h3>
        <p className="text-gray-900 whitespace-pre-line">
          {showFullText || fullText.length <= 150 ? fullText : shortText}
          {!showFullText && fullText.length > 150 && (
            <button
              onClick={() => setShowFullText(true)}
              className="text-primary-700  font-medium ml-1"
            >
              читати більше
            </button>
          )}
        </p>
      </div>

      <div>
        <h3 className="text-[16px] lg:text-[18px] font-semibold mb-4">
          Тварини, з якими працюю:
        </h3>
        <div className="flex  flex-row md:justify-between lg:justify-between lg:gap-12">
          <ul className="flex flex-col gap-2 md:justify-between md:columns-2 lg:justify-between lg:columns-2 space-y-2">
            <ul className="flex flex-wrap gap-2 lg:justify-between md:block md:columns-2 md:[text-decoration-line:none] md:overflow-visible  lg:columns-2  mb-8 space-y-2">
              {veterinarian.petTypes?.map((type) => (
                <li
                  key={type}
                  className="flex px-2 items-center w-auto h-[32px] text-[14px] border border-[#e2effb] rounded-full gap-2 md:h-auto  md:text-[16px]
        md:mb-2  md:border-none md:justify-start lg:border-none lg:justify-start lg:text-[16px] w-[248px]"
                >
                  <Icon
                    sprite="/sprites/sprite-animals.svg"
                    id={petTypeIcons[type] || "icon-dog"}
                    width="20px"
                    height="20px"
                    className="stroke-primary stroke-1 scale-x-[-1] lg:w-[24px] md:h-[24px] lg:h-[24px]"
                  />
                  <p>{petTypePlural[type] || type}</p>
                </li>
              ))}
            </ul>

            <h4 className="text-[16px]  md:text-[18px] lg:text-[18px] font-semibold mb-4">
              Які проблеми лікую:
            </h4>
            <ul className="flex flex-wrap gap-2 md:block  md:columns-2 lg:gap-4">
              {veterinarian.issueTypes?.map((issue) => (
                <li
                  key={issue}
                  className="flex w-auto h-[32px] px-2 justify-center items-center text-[14px] gap-2 border border-[#e2effb] rounded-full md:border-none md:h-auto md:px-0 md:text-[16px] md:mb-2 md:justify-start md:[break-inside:avoid] lg:border-none lg:justify-start lg:text-[16px]"
                >
                  <Icon
                    sprite="/sprites/sprite-problems.svg"
                    id={issueTypeIcons[issue] || "icon-bones"}
                    width="20px"
                    height="20px"
                    className="stroke-primary stroke-1 scale-x-[-1] lg:w-[24px] lg:h-[24px]"
                  />
                  <p>{issue}</p>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
