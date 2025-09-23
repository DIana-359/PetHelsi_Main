"use client";

import { Veterinarian } from "@/utils/types/veterinarian";
import Image from "next/image";

type Props = {
  veterinarian: Veterinarian;
};

const EducationTab = ({ veterinarian }: Props) => {
  const education = veterinarian.education;
  const additionalEducation = veterinarian.additionalEducation;

  return (
    <div className="flex flex-col gap-6">
      {/* Загальна освіта */}
      <div>
        <h3 className="text-[16px]  md:text-[18px] lg:text-[18px] font-semibold mb-4">
          Загальна освіта
        </h3>
        {!education ? (
          <p className="text-gray-500">
            Інформація про додаткову освіту відсутня.
          </p>
        ) : (
          <div className="flex flex-col">
            <p className="text-[16px] text-gray-900 mb-1">
              {veterinarian.education.eduInstitution}
            </p>
            <p className="text-[14px] text-gray-500 mb-2">
              {veterinarian.education.startDateStudy} -{" "}
              {veterinarian.education.finishDateStudy}
            </p>
            {veterinarian.education.diplomaUrl?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-2">
                {veterinarian.education.diplomaUrl.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Diploma ${index + 1}`}
                    width={64}
                    height={64}
                    className="rounded-sm"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Додаткова освіта */}

      <h3 className="text-[16px]  md:text-[18px] lg:text-[18px] font-semibold mb-4">
        Додаткова освіта
      </h3>
      <div className="flex flex-col mb-8 gap-4">
        {additionalEducation && additionalEducation.length > 0 ? (
          additionalEducation.map((edu, idx) => (
            <div key={idx} className="flex flex-col">
              <p className="text-[16px] text-gray-900 mb-1">
                {edu.learningCenter}
              </p>
              <p className="text-[14px] text-gray-500 mb-2">
                {edu.startDateLearning} - {edu.finishDateLearning}
              </p>
              {edu.certificateUrl?.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-2">
                  {edu.certificateUrl.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Certificate ${index + 1}`}
                      width={64}
                      height={64}
                      className="rounded-sm"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            Інформація про додаткову освіту відсутня.
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationTab;
