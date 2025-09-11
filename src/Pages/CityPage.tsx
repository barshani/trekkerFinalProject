import React, { useState } from 'react';
import DayPickerModal from '../components/DayPickerModal';
import CityCard from '../components/CityCard';
import cities from '../Data/Cities.json'
import { setCity } from '../auth/TokenManager';
import './CityPage.css';
function CityPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const handleCardClick = (city: string) => {
    setSelectedCity(city);
    setCity(city)
  };

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
                onClick={() => handleCardClick(city.name)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedCity && (
        <DayPickerModal
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </div>
  );
}
export default CityPage
