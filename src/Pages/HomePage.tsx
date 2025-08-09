import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCity, getDays, verifyCity } from '../auth/TokenManager';

function HomePage() {
  const navigate = useNavigate();
  const city = getCity();
  const days = getDays();

  const handleStart = () => {
    if (!verifyCity())
      navigate('/city');
    else
      navigate(`/plan/${city.toLowerCase()}/${days}`);
  };

  return (
    <div className="container text-center my-5">
      <h1 className="display-4 mb-4">Welcome to Trekker</h1>
      <p className="lead mb-4">
        Embark on your most exciting adventure with <strong>Trekker</strong>, your personalized travel companion designed to help you create the perfect itinerary, one step at a time.
      </p>
      <p className="mb-4">
        Whether you're dreaming of exploring iconic landmarks, hidden gems, or planning a well-deserved getaway, Trekker is here to guide you through it all. From the moment you land, we'll help you discover the top attractions, suggest the best activities, and ensure that every moment of your trip is filled with unforgettable experiences.
      </p>
      <p className="mb-4">
        No matter if you're traveling solo, with family, or friends, Trekker adapts to your needs. It's not just a travel planner—it's a way to bring your adventure to life, helping you make every day of your journey count.
      </p>
      <button className="btn btn-primary btn-lg" onClick={handleStart}>
        Start Planning Your Adventure
      </button>
    </div>
  );
}

export default HomePage;
