import React from 'react';

interface TripCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

function CountryCard({ title, description, imageUrl, onClick }: TripCardProps) {
  return (
    <div
      className="card h-100 shadow-sm"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default CountryCard;