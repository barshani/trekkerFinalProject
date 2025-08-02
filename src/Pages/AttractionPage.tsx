import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard';
import attractionsData from '../Data/Attractions.json';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
interface Attraction {
  name: string;
  description: string;
  imageUrl: string;
  mapUrl: string
}
function onAdd(name: string, day: number) {
  const stored = localStorage.getItem("tripPlan");

  let plan: string[][] = [];

  if (stored) {
    try {
      plan = JSON.parse(stored);
    } catch (e) {
      console.error("Invalid JSON in localStorage");
      plan = [];
    }
  }
  while (plan.length <= day) {
    plan.push([]);
  }
  if (!plan[day].includes(name)) {
    plan[day].push(name);
  }
  localStorage.setItem("tripPlan", JSON.stringify(plan));
  const dayNum = Number(day)+1
  toast.success(`attraction added to day ${dayNum}`, {
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
function AttractionPage() {
  const { cityname } = useParams<{ cityname: string }>();
  const cityKey = cityname?.toLowerCase() || '';
  const attractions: Attraction[] = (attractionsData as Record<string, Attraction[]>)[cityKey] || [];
  const [showModal, setShowModal] = useState(false);
  const [todayPlan, setTodayPlan] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {day} = useParams<{day:string}>()
  const loadTodayPlan = (day: number) => {
    const stored = localStorage.getItem("tripPlan");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed[day]) {
          setTodayPlan(parsed[day]);
        } else {
          setTodayPlan([]);
        }
      } catch (e) {
        console.error("Error parsing tripPlan:", e);
        setTodayPlan([]);
      }
    }
  };
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Top Attractions in {(cityname ?? '')?.charAt(0).toUpperCase() + cityname?.slice(1)}
      </h2>
      <div className="text-center mb-4">
        <Button
          variant="info"
          onClick={() => {
            loadTodayPlan(parseInt(day || "1"));
            setShowModal(true);
          }}
        >
          View Today's Plan
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
                <li key={idx} className="list-group-item">{item}</li>
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