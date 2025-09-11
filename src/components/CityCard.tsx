import React from 'react';

interface CityCardProps {
  title: string;
  flagUrl: string;
  onClick?: () => void;
}

function CityCard({ title, flagUrl, onClick }: CityCardProps) {
  return (
    <div
      className="city-card shadow-sm"
      onClick={onClick}
    >
      <img src={flagUrl} className="city-card-img" alt={title} />
      <div className="city-card-overlay">
        <h3 className="city-card-title">{title}</h3>
      </div>
    </div>
  );
}

export default CityCard;
