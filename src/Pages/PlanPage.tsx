import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PlanPage() {
  const { city, days } = useParams<{ city: string; days: string }>();
  const navigate = useNavigate();
  const numDays = parseInt(days || '1');
const [plan, setPlan] = useState<string[][]>(
  Array.from({ length: numDays }, () => [])
);  const handleAddAttraction = (dayIndex: number) => {
    navigate(`/attractionPage/${city}/${dayIndex}`);
  };
  useEffect(() => {
  const stored = localStorage.getItem("tripPlan");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setPlan(parsed);
      }
    } catch (e) {
      console.error("Invalid JSON in localStorage", e);
    }
  }
}, []);
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Trip to {city}</h2>
      <div className="row">
        {Array.from({ length: numDays }).map((_, dayIndex) => (
          <div className="col-md-4 mb-4" key={dayIndex}>
            <div className="card h-100">
              <div className="card-header">
                Day {dayIndex + 1}
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush mb-3">
                  {plan[dayIndex]?.map((item, idx) => (
                    <li className="list-group-item" key={idx}>{item}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleAddAttraction(dayIndex)}
                >
                  + Add Attraction
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanPage;
