import { Veterinarian } from '@/utils/types/veterinarian';
import Icon from '../Icon';
import { useState } from 'react';
import DocReviews from './DocReviews';

type Props = {
  veterinarian: Veterinarian;
};

const petTypeIcons: Record<string, string> = {
  Собака: 'icon-dog',
  Кіт: 'icon-cat',
  Птах: 'icon-bird',
  Гризун: 'icon-rabbit',
  Плазун: 'icon-turtle',
  Інше: 'icon-other',
};

const petTypePlural: Record<string, string> = {
  Собака: 'Собаки',
  Кіт: 'Коти',
  Птах: 'Птахи',
  Гризун: 'Гризуни',
  Плазун: 'Плазуни',
};

const issueTypeIcons: Record<string, string> = {
  'Блохи/кліщі': 'icon-insects',
  'Харчовий розлад': 'icon-eating-disorder',
  'Шкірні/вушні інфекції': 'icon-skin-infection',
  'Травмування частин тіла': 'icon-bones',
  'Догляд та утримання': 'icon-care',
  'Інше': 'icon-other',
  'Проблеми з очима': 'icon-eye-problems',
  'Алергічна реакція': 'icon-allergy',
  'Проблеми із травленням': 'icon-digestive-problems',
  
};

const AboutTab = ({ veterinarian }: Props) => {
  const [showFullText, setShowFullText] = useState(false);

  const fullText = veterinarian.description;
  const shortText = fullText.slice(0, 150) + '...';

  return (
    <div className="flex flex-col gap-8 text-gray-900">
      <div>
        <h3 className="text-[18px] font-semibold mb-4">Про мене</h3>
        <p className="text-gray-900 whitespace-pre-line">
          {showFullText || fullText.length <= 150 ? fullText : shortText}
          {!showFullText && fullText.length > 150 && (
            <button
              onClick={() => setShowFullText(true)}
              className="text-primary-700 font-medium ml-1"
            >
              читати більше
            </button>
          )}
        </p>
      </div>

      <div>
        <h3 className="text-[18px] font-semibold mb-4">
          Тварини, з якими працюю:
        </h3>
        <div className="flex flex-row justify-between gap-12">
           <ul className="columns-2 gap-6 mb-8 space-y-2">
            {veterinarian.petTypes?.map((type) => (
            <li key={type} className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id={petTypeIcons[type] || 'icon-dog'}
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>{petTypePlural[type] || type}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[18px] font-semibold mb-4">Які проблеми лікую:</h4>
        <ul className="flex flex-wrap gap-4 mb-8">
          {veterinarian.issueTypes?.map((issue) => (
            <li key={issue} className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id={issueTypeIcons[issue] || 'icon-bones'}
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>{issue}</p>
            </li>
          ))}
            {/* <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id="icon-dog"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Собаки</p>
            </li>
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id="icon-cat"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Коти</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id="icon-bird"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Птахи</p>
            </li>
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id="icon-rabbit"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Гризуни</p>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className="text-[18px] font-semibold mb-4">Які проблеми лікую:</h4>
        <div className="flex flex-row justify-between gap-12 mb-8">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id="icon-insects"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Блохи/кліщі</p>
            </li>
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id="icon-eating-disorder"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Харчовий розлад</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id="icon-skin-infection"
                width="24px"
                height="24px"
                className="stroke-primary stroke-1 scale-x-[-1]"
              />
              <p>Шкірні/вушні інфекції</p>
            </li>
            <li className="flex items-center gap-2 w-[248px]">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id="icon-bones"
                width="24px"
                height="24px"
                className="stroke-primary"
              />
              <p>Травмування частин тіла</p>
            </li> */}
          </ul>
        </div>
      </div>
      <DocReviews reviews={veterinarian.reviews} />
    </div>
  );
};

export default AboutTab;
