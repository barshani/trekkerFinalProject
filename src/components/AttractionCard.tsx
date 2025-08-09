import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AttractionModal from './AttractionModal';
import { useParams } from 'react-router-dom';
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
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {day} = useParams<{day:string}>()
  return (
    <>
    <div className="card h-100 shadow-sm">
      <a href={imageUrl} target="_blank" rel="noreferrer">
        <img src={`${imageUrl}&imgsz=large`} className="card-img-top" alt={name} />
      </a>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
      <Button variant="info" onClick={() => setShowModal(true)}>
        View Attraction
      </Button>
      {!isAttractionInDay(name,Number(day))&&<Button
        variant="success"
        onClick={() => {
          onAdd(name, day);        
          setAdded(true);           
        }}
      >ADD
      </Button>}
      {isAttractionInDay(name,Number(day))&&<Button
        variant="danger"
        onClick={() => {
          onRemove(name, day);        
          setAdded(false);          
        }}
      >DELETE
      </Button>}
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
