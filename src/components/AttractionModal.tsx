import React from 'react';

interface AttractionModalProps {
  show: boolean;
  onClose: () => void;
  name: string;
  details?: string;
  openingHours?: string;
  mapUrl?: string;
  description?: string;
}

function AttractionModal({ show, onClose, name, details, openingHours, mapUrl, description }: AttractionModalProps) {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary mt-2">
          View on Google Maps
           </a>
            <p><strong>Opening Hours:</strong> {openingHours || 'Not available'}</p>
            <p>{details || description}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttractionModal;
