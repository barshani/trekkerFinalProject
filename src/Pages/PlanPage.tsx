import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { removeCity, removeDays, removeTripPlan } from '../auth/TokenManager';
import jsPDF from 'jspdf';
import './PlanPage.css';

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
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 0; // Start at 0 to draw header from the top

    // --- PDF Header ---
    // Header background
    doc.setFillColor(44, 62, 80); // #2c3e50
    doc.rect(0, 0, pageWidth, 40, 'F'); // Filled rectangle for header

    // Main Title
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // White
    doc.text(`Your Trip to ${city}`, pageWidth / 2, 20, { align: 'center' });

    // Subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(26, 188, 156); // #1abc9c
    doc.text(`A ${days}-day adventure curated by Trekker`, pageWidth / 2, 28, { align: 'center' });

    y = 50; // Set y position after the header

    // --- PDF Content ---
    plan.forEach((dayPlan, dayIdx) => {
      // Check if there's enough space for the day's header, otherwise start a new page
      if (y + 25 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      // Day Header Background
      doc.setFillColor(236, 240, 241); // A light grey #ecf0f1
      doc.setDrawColor(221, 221, 221); // A lighter grey for border
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y - 5, pageWidth - (margin * 2), 12, 3, 3, 'FD');

      // Day Header Text
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(44, 62, 80); // #2c3e50
      doc.text(`Day ${dayIdx + 1}`, margin + 5, y + 2);
      y += 15;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(52, 73, 94); // A darker grey #34495e

      if (dayPlan.length === 0) {
        doc.setTextColor(149, 165, 166); // A lighter grey #95a5a6
        doc.text('• No attractions planned for this day.', margin + 10, y);
        y += 10;
      } else {
        dayPlan.forEach((item) => {
          if (y > pageHeight - margin) { // Add new page if content overflows
            doc.addPage();
            y = margin;
          }
          // Custom bullet point
          doc.setFillColor(26, 188, 156); // Teal #1abc9c
          doc.circle(margin + 12, y - 1.5, 1.5, 'F');
          doc.text(item, margin + 20, y);
          y += 8;
        });
      }
      y += 10; // Extra space between days
    });

    // --- PDF Footer with Page Numbers ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(149, 165, 166); // #95a5a6
      // Footer line
      doc.setDrawColor(221, 221, 221); // #dddddd
      doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin,
        pageHeight - 8,
        { align: 'right' }
      );
      doc.text(
        `Trekker | Your Travel Companion`,
        margin,
        pageHeight - 8,
        { align: 'left' }
      );
    }

    doc.save(`Trekker_Plan_${city}.pdf`);
  };
  return (
    <div className="plan-page-container">
      <div className="container">
        <h2 className="plan-page-header text-center">Your Trip to {city}</h2>
        <div className="d-flex justify-content-center gap-3 mb-5 plan-actions">
          <Button
            variant="success"
            onClick={handleDownloadPDF}
            disabled={plan.every(day => day.length === 0)}
          >
            <i className="bi bi-download me-2"></i>Download as PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              removeCity();
              removeDays();
              removeTripPlan();
              navigate('/city');
            }}
          >
            <i className="bi bi-arrow-left-circle me-2"></i>Plan Another Trip
          </Button>
        </div>

        <div className="row">
          {Array.from({ length: numDays }).map((_, dayIndex) => (
            <div className="col-lg-4 col-md-6 mb-4" key={dayIndex}>
              <div className="day-card">
                <div className="card-header">
                  Day {dayIndex + 1}
                </div>
                <div className="card-body">
                  <ul className="attractions-list">
                    {plan[dayIndex] && plan[dayIndex].length > 0 ? (
                      plan[dayIndex].map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))
                    ) : (
                      <li className="text-muted fst-italic">No attractions planned.</li>
                    )}
                  </ul>
                  <Button
                    variant="outline-primary"
                    className="edit-day-btn w-100"
                    onClick={() => handleAddAttraction(dayIndex)}
                  >
                    Edit Day
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanPage;
