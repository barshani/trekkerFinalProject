import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNumDays, setCity } from '../auth/TokenManager';
import './CityCard.css';

interface CityCardProps {
  title: string;
  flagUrl: string;
}

function CityCard({ title, flagUrl }: CityCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [days, setDays] = useState(1);
  const navigate = useNavigate();

  const handleFlip = (e: React.MouseEvent) => {
    // Stop propagation to prevent nested clicks from interfering
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCity(title);
    setNumDays(String(days));
    navigate(`/plan/${title.toLowerCase()}/${days}`);
  };

  return (
    <div className="flip-card-city" onClick={handleFlip}>
      <div className={`flip-card-inner-city ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flip-card-front-city">
          <div className="city-card">
            <img src={flagUrl} className="city-card-img" alt={title} />
            <div className="city-card-overlay">
              <h3 className="city-card-title">{title}</h3>
            </div>
          </div>
        </div>
        <div className="flip-card-back-city">
          <div className="city-card-back-content">
            <h5 className="mb-3">Trip Length</h5>
            <label htmlFor={`days-${title}`} className="form-label">
              Days in {title}?
            </label>
            <input
              type="number"
              id={`days-${title}`}
              min={1} max={30}
              className="form-control mb-3"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary btn-sm" onClick={handleFlip}>Back</button>
              <button className="btn btn-primary btn-sm" onClick={handleConfirm}>Start Planning</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityCard;
