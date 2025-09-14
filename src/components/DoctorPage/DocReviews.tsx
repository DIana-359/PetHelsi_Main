import React, { useState } from "react";
import { Veterinarian } from "@/utils/types/veterinarian";
import StarsRating from "../StarsRating";
import { Avatar } from "@heroui/react";
import vetImg from "@/../public/Images/VeterinarianCard-img-eg.jpg";
import ReviewIcon from "./ReviewIcon";

interface DocReviewsProps {
  reviews: Veterinarian["reviews"];
}

const DocReviews: React.FC<DocReviewsProps> = ({ reviews }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (!reviews || reviews.length === 0) {
    return (
      <div>
        <h3 className="text-[18px] font-semibold mb-8 ">Відгуки</h3>
        <div className="flex flex-col items-center">
          <ReviewIcon />
          <p className="text-gray-500 mt-6">У ветеринара ще немає відгуків</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[18px] font-semibold mb-6">Відгуки</h2>

      {reviews.map((review, index) => {
        const fullText = review.comment;
        const shortText = fullText.slice(0, 150) + "...";
        const isLong = fullText.length > 150;

        return (
          <div
            key={index}
            className="flex flex-col gap-4 items-start justify-between mb-8"
          >
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12" radius="full" src={vetImg.src} />
                <div>
                  <p className="font-medium">{review.fullName}</p>
                  <span className="text-[14px] text-gray-500">
                    {formatDate(review.dateReviews)}
                  </span>
                </div>
              </div>
              <StarsRating rating={Number(review.rating)} />
            </div>
            <div>
              <p className="text-gray-900 whitespace-pre-line">
                {showFullText || !isLong ? fullText : shortText}
                {!showFullText && isLong && (
                  <button
                    onClick={() => setShowFullText(true)}
                    className="text-primary-700 font-medium ml-1"
                  >
                    читати більше
                  </button>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DocReviews;

// Вспомогательная функция форматирования даты (можно заменить по стилю под проект)
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
