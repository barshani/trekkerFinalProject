import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard';
import attractionsData from '../Data/Attractions.json';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { setTripPlan, getTripPlan, updateTripPlan, removeCity, removeDays, removeTripPlan } from '../auth/TokenManager'; // Import utility functions

export interface Attraction {
  _id?:string;
  name: string;
  city: string;
  description: string;
  imageUrl: string;
  mapUrl: string;
  details: string,
  openingHours: string,
}

function AttractionPage() {
  const { cityname } = useParams<{ cityname: string }>();
  const cityKey = cityname?.toLowerCase() || '';
  const attractions: Attraction[] = (attractionsData as Record<string, Attraction[]>)[cityKey] || [];
  const [showModal, setShowModal] = useState(false);
  const [todayPlan, setTodayPlan] = useState<string[]>([]);
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();

  // Load the trip plan for the given day
  const loadTodayPlan = (day: number) => {
    const plan = getTripPlan();
    if (Array.isArray(plan) && plan[day]) {
      setTodayPlan(plan[day]);
    } else {
      setTodayPlan([]);
    }
  };

  // Add an attraction to the trip plan for a specific day
  function onAdd(name: string, day: number) {
    const plan = getTripPlan();

    while (plan.length <= day) {
      plan.push([]);
    }

    if (!plan[day].includes(name)) {
      plan[day].push(name);
    }

    updateTripPlan(plan);

    const dayNum = Number(day) + 1;
    toast.success(`Attraction added to day ${dayNum}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // Remove an attraction from the trip plan for a specific day
  function onRemove(name: string, day: number) {
    const plan = getTripPlan();
    // Remove the attraction from the plan for the specific day
    const updatedPlan = plan[day].filter((item: string) => item !== name);
    plan[day] = updatedPlan;

    updateTripPlan(plan);

    const dayNum = Number(day) + 1;
    toast.success(`Attraction removed from day ${dayNum}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    loadTodayPlan(day);
  }
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Top Attractions in {(cityname ?? '')?.charAt(0).toUpperCase() + cityname?.slice(1)}
      </h2>
      <div className="text-center mb-4">
        <Button
          variant="info"
          className='me-3 w-25'
          onClick={() => {
            loadTodayPlan(parseInt(day || "1"));
            setShowModal(true);
          }}
        >
          View Today's Plan
        </Button>
        <Button
          className='w-25'
          variant="info"
          onClick={()=>navigate(-1)}
        >
          Done
        </Button>
      </div>
      <div className="row">
        {attractions.length === 0 ? (
          <p className="text-center">No attractions found for "{cityname}"</p>
        ) : (
          attractions.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <AttractionCard
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
                mapUrl={item.mapUrl}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </div>
          ))
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Plan for Day {parseInt(day || "1") + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {todayPlan.length > 0 ? (
            <ul className="list-group">
              {todayPlan.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  {item}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRemove(item, parseInt(day || "1"))}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No attractions added yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default AttractionPage;
