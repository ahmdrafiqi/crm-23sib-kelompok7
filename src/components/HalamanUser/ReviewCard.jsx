import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{review.name}</h3>
        <div className="flex items-center text-yellow-400">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
