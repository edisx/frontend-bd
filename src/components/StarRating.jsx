import React, { useState } from 'react';
import { Star } from 'react-feather';

const StarRating = ({ totalStars = 5, initialRating = 0, onRatingSelected, isInteractive = true }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(initialRating);

    const handleMouseEnter = (rating) => {
        if (isInteractive) {
            setHoverRating(rating);
        }
    };

    const handleMouseLeave = () => {
        if (isInteractive) {
            setHoverRating(0);
        }
    };

    const handleClick = (rating) => {
        if (isInteractive) {
            setSelectedRating(rating);
            if (onRatingSelected) {
                onRatingSelected(rating);
            }
        }
    };

    const currentRating = isInteractive ? hoverRating || selectedRating : initialRating;

    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <Star
                        key={ratingValue}
                        onMouseEnter={() => handleMouseEnter(ratingValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(ratingValue)}
                        className={`cursor-pointer ${ratingValue <= currentRating ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'}`}
                        style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
