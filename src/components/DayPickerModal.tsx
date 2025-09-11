import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNumDays } from '../auth/TokenManager';
import './DayPickerModal.css';

interface Props {
  city: string;
  onClose: () => void;
}

function DayPickerModal({ city, onClose }: Props) {
  const [days, setDays] = useState(1);
  const navigate = useNavigate();
  
  const handleConfirm = () => {
    setNumDays(String(days))
    navigate(`/plan/${city.toLowerCase()}/${days}`);
  };

  return (
    <>
      <div className="day-picker-modal-backdrop"></div>
      <div className="modal d-block day-picker-modal" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Trip Length</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body text-center">
              <label htmlFor="days" className="form-label">How many days are you staying in {city}?</label>
              <input
                type="number"
                id="days"
                min={1}
                max={30}
                className="form-control"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" onClick={handleConfirm}>Start Planning</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DayPickerModal;
