import React from 'react';
import CityCard from '../components/CityCard';
import cities from '../Data/Cities.json'
import './CityPage.css';

function CityPage() {
  return (
    <div className="city-page">
      <div className="container">
        <div className="text-center page-header">
          <h1>Choose Your Destination</h1>
          <p>Select a city to begin crafting your personalized travel itinerary.</p>
        </div>
        <div className="row">
          {cities.map((city, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <CityCard
                title={city.name}
                flagUrl={city.flagUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CityPage
