import React, { useState } from 'react';
import DayPickerModal from '../components/DayPickerModal';
import CityCard from '../components/CityCard';
import cities from '../Data/Cities.json'
function CityPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const handleCardClick = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Choose Your Destination</h2>
      <div className="row">
        {cities.map((city, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <CityCard
              title={city.name}
              description={city.description}
              imageUrl={city.imageUrl}
              onClick={() => handleCardClick(city.name)}
            />
          </div>
        ))}
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
