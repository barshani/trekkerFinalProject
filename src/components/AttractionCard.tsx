import React from 'react';

interface AttractionCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

function AttractionCard({ name, description, imageUrl }: AttractionCardProps) {
  return (
    <div className="card h-100 shadow-sm">
      <a href={imageUrl} target="_blank" rel="noreferrer">
        <img src={`${imageUrl}&imgsz=large`} className="card-img-top" alt={name} />
      </a>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default AttractionCard;
