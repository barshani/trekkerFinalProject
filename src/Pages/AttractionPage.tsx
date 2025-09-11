import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard';
import attractionsData from '../Data/Attractions.json';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { setTripPlan, getTripPlan, updateTripPlan, removeCity, removeDays, removeTripPlan } from '../auth/TokenManager'; // Import utility functions
import jsPDF from 'jspdf';
import { getAttractions } from '../services/apiService';

export interface Attraction {
  _id?:string;
  name: string;
  city: string;
  description: string;
  imageUrl: string;
  mapUrl: string;
  details: string,
  openingHours: string,
  aproved?: boolean;
}

function AttractionPage() {
  const { cityname } = useParams<{ cityname: string }>();
  const cityKey = cityname?.toLowerCase() || '';
  const attractions: Attraction[] = (attractionsData as Record<string, Attraction[]>)[cityKey] || [];
  const [newAttractions, setNewAttractions] = useState<Attraction[]>([]);
  const [allAttractions, setAllAttractions] = useState<Attraction[]>([]);
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
  useEffect(() => {
    const fetchAndCombineAttractions = async () => {
      // 1. Get attractions from the local JSON file
      const localAttractions: Attraction[] = (attractionsData as Record<string, Attraction[]>)[cityKey] || [];

      try {
        // 2. Fetch attractions from the API
        const apiAttractions = await getAttractions();
        const filteredApiAttractions = apiAttractions.filter(
          (attraction) => attraction.city.toLowerCase() === cityKey && attraction.aproved
        );

        // 3. Combine local and API attractions, avoiding duplicates
        const combined = [...localAttractions];
        const existingNames = new Set(localAttractions.map((attr) => attr.name));

        filteredApiAttractions.forEach((apiAttr) => {
          if (!existingNames.has(apiAttr.name)) {
            combined.push(apiAttr);
          }
        });

        setAllAttractions(combined);
      } catch (error) {
        console.error('Error fetching attractions:', error);
        setAllAttractions(localAttractions); // Fallback to local data
      }
    };
    fetchAndCombineAttractions();
  }, [cityKey]);

  function filterAttractionsByCity(attractions: Attraction[], city: string): void {
    const filterAttraction =  attractions.filter(attraction => attraction.city.toLowerCase() === city.toLowerCase() && attraction.aproved);
    setNewAttractions(filterAttraction);
  }
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
    <div className="bg-light">
      <div className="container my-5 p-4 p-md-5 bg-white rounded shadow-sm">
        <h2 className="text-center mb-4 display-5 fw-bold">
          Top Attractions in {(cityname ?? '')?.charAt(0).toUpperCase() + cityname?.slice(1)}
        </h2>
        <div className="text-center mb-5">
          <Button
            variant="outline-primary"
            className="me-3 px-4 py-2"
            onClick={() => {
              loadTodayPlan(parseInt(day || "1"));
              setShowModal(true);
            }}
          >
            <i className="bi bi-card-list me-2"></i>
            View Today's Plan
          </Button>
          <Button
            variant="outline-secondary"
            className="px-4 py-2"
            onClick={()=>navigate(-1)}
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Done
          </Button>
        </div>
        <div className="row">
          {allAttractions.length === 0 ? (
            <p className="text-center fst-italic text-muted">No attractions found for "{cityname}"</p>
          ) : (
            allAttractions.map((item, index) => (
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
                    <i className="bi bi-trash-fill me-1"></i> Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center py-3">No attractions added yet.</p>
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
        theme="light"
      />
    </div>
  );
}

export default AttractionPage;
