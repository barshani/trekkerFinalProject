import React from 'react';
import CountryCard from '../components/CountryCard';

interface Destination {
  title: string;
  description: string;
  imageUrl: string;
}

const destinations: Destination[] = [
  {
    title: 'Madrid',
    description: 'Explore the Eiffel Tower, cafes, and romantic streets.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
  },
  {
    title: 'Barcelona',
    description: 'Relax on the French Riviera with sunny beaches.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
  },
  {
    title: 'Prague',
    description: 'Enjoy gourmet food and historical architecture.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/120px-Flag_of_the_Czech_Republic.svg.png',
  },
];

function CountryPage() {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Top Destinations in the world</h2>
      <div className="row">
        {destinations.map((dest, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <CountryCard
              title={dest.title}
              description={dest.description}
              imageUrl={dest.imageUrl}
              onClick={() => alert(`Clicked on ${dest.title}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryPage;
