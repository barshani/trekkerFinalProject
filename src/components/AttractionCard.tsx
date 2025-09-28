import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './AttractionCard.css';
interface AttractionCardProps {
  name: string;
  description: string;
  imageUrl: string;
  mapUrl?: string;
  details?: string;
  openingHours?: string;
  onAdd: (name: string, day: number) => void;
  onRemove: (name: string, day: number) => void;
}
function isAttractionInDay(name: string, day: number): boolean {
  const stored = localStorage.getItem("tripPlan");

  if (!stored) return false;

  try {
    const plan: string[][] = JSON.parse(stored);
    return plan[day]?.includes(name) || false;
  } catch (e) {
    console.error("Invalid JSON in tripPlan", e);
    return false;
  }
}
function AttractionCard({ name, description, imageUrl,details, mapUrl,openingHours,onAdd,onRemove}: AttractionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const {day} = useParams<{day:string}>()
  const [isAdded, setIsAdded] = useState(() => isAttractionInDay(name, Number(day)));

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleAdd = () => {
    onAdd(name, Number(day));
    setIsAdded(true);
  };

  const handleRemove = () => {
    onRemove(name, Number(day));
    setIsAdded(false);
  };

  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flip-card-front">
          <div className="card h-100 shadow-sm attraction-card">
            <img src={imageUrl} className="card-img-top" alt={name} />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{description}</p>
            </div>
            <div className="card-footer-buttons">
              <Button variant="info" onClick={handleFlip}>
                View Details
              </Button>
              {!isAdded ? (
                <Button variant="success" onClick={handleAdd}>
                  Add
                </Button>
              ) : (
                <Button variant="danger" onClick={handleRemove}>
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flip-card-back">
           <div className="card h-100 shadow-sm attraction-card">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p><strong>Opening Hours:</strong> {openingHours || 'Not available'}</p>
              <p>{details || description}</p>
              {mapUrl && <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary mt-2">View on Map</a>}
            </div>
            <div className="card-footer-buttons justify-content-center">
              <Button variant="secondary" onClick={handleFlip}>Back</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttractionCard;
