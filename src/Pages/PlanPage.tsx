import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { removeCity, removeDays, removeTripPlan } from '../auth/TokenManager';
import jsPDF from 'jspdf';

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
const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setFontSize(18);
  doc.text(`Trip Plan for ${city}`, 10, 15);
  doc.setFontSize(14);

  let y = 30;
  plan.forEach((dayPlan, dayIdx) => {
    doc.text(`Day ${dayIdx + 1}:`, 10, y);
    y += 8;
    if (dayPlan.length === 0) {
      doc.text('- No attractions planned', 15, y);
      y += 8;
    } else {
      dayPlan.forEach((item) => {
        doc.text(`- ${item}`, 15, y);
        y += 8;
      });
    }
    y += 4;
    // If page is full, add new page
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`trip_plan_${city}.pdf`);
};
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Trip to {city}</h2>
<div className="d-flex justify-content-end mb-3">
  <Button
    variant="success"
    className="me-2"
    onClick={handleDownloadPDF}
    disabled={plan.every(day => day.length === 0)}
  >
    Download as PDF
  </Button>
  <Button
    variant="info"
    className="w-25"
    onClick={() => {
      removeCity();
      removeDays();
      removeTripPlan();
      navigate(-1);
    }}
  >
    Other City
  </Button>
</div>

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
                  Edit Day
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
