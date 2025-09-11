import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AttractionModal from './AttractionModal';
import { useParams } from 'react-router-dom';
import './AttractionCard.css';
interface AttractionCardProps {
   name: string;
  description: string;
  imageUrl: string;
  mapUrl?: string;
  details?: string;
  openingHours?: string;
  onAdd: Function;
  onRemove: Function;
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
  const [showModal, setShowModal] = useState(false);

  const {day} = useParams<{day:string}>()

  return (
    <>
    <div className="card h-100 shadow-sm attraction-card">
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer-buttons">
        <Button variant="info" onClick={() => setShowModal(true)}>
          View Details
        </Button>
        {!isAttractionInDay(name, Number(day)) ? (
          <Button
            variant="success"
            onClick={() => {
              onAdd(name, day);
            }}
          >
            Add
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => {
              onRemove(name, day);
            }}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
    <AttractionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        name={name}
        description={description}
        details={details}
        openingHours={openingHours}
        mapUrl={mapUrl}
      />
      </>
  );
}

export default AttractionCard;
