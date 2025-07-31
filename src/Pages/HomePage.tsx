import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/countryPage');
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Welcome to Trekker</h1>
      <p className="lead mb-4">
        Trekker helps you plan your perfect travel itinerary with ease. 
        Discover top attractions, explore cities, and customize your trip step-by-step. 
        Whether you're traveling solo or with friends, Trekker is your personal trip planner.
      </p>
      <button className="btn btn-primary btn-lg" onClick={handleStart}>
        Start Planning
      </button>
    </div>
  );
}

export default HomePage;
