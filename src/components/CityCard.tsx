import React from 'react';

interface CountryCardProps {
  title: string;
  description: string;
  flagUrl: string;
  onClick?: () => void;
}

function CityCard({ title, description, flagUrl, onClick }: CountryCardProps) {
  return (
    <div
      className="card h-100 shadow-sm"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img src={flagUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default CityCard;
