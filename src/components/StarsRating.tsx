import React from 'react';
import Icon from '@/components/Icon';

interface StarsRatingProps {
  rating: number;
}

const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
  const filledStars = Math.round(Number(rating));
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <Icon
          key={index}
          sprite="/sprites/sprite-sistem.svg"
          id={index < filledStars ? 'icon-star_fill' : 'icon-star_outlined'}
          width="20px"
          height="20px"
          className={index < filledStars ? 'fill-primary-700' : 'fill-none'}
        />
      ))}
    </div>
  );
};

export default StarsRating;
