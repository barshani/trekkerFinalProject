// c:\Users\barsh\OneDrive\Desktop\Project_or_bar_web\trekker\src\Pages\HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCity, getDays, verifyCity } from '../auth/TokenManager';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const city = getCity();
  const days = getDays();

  const handleStart = () => {
    // If a valid plan is already stored, navigate to it.
    // Otherwise, start a new plan by selecting a city.
    if (verifyCity() && city && days) {
      navigate(`/plan/${city.toLowerCase()}/${days}`);
    } else {
      navigate('/city');
    }
  };

  return (
    <div className="home-page">
      
      {/* Welcome & Features Section */}
      <Container className="my-5 text-center">
        <Row className="mb-4">
          <Col>
            <h1 className="display-4">Welcome to Trekker</h1>
            <p className="lead">
              Your personalized travel companion designed to help you create the perfect itinerary, one step at a time.
            </p>
            <hr className="my-4" />
          </Col>
        </Row>

        <Row className="justify-content-center">
          {/* Feature 1 */}
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex flex-column">
                <i className="bi bi-compass fs-1 text-primary mb-3"></i>
                <Card.Title as="h4">Discover Attractions</Card.Title>
                <Card.Text className="flex-grow-1">
                  Explore iconic landmarks and hidden gems. We'll help you find the best activities for your trip.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Feature 2 */}
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex flex-column">
                <i className="bi bi-calendar-check fs-1 text-primary mb-3"></i>
                <Card.Title as="h4">Build Your Plan</Card.Title>
                <Card.Text className="flex-grow-1">
                  Organize your adventure day-by-day. Trekker adapts to your needs, whether you travel solo or with family.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Feature 3 */}
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex flex-column">
                <i className="bi bi-camera fs-1 text-primary mb-3"></i>
                <Card.Title as="h4">Experience More</Card.Title>
                <Card.Text className="flex-grow-1">
                  Bring your adventure to life and make every moment of your journey count with our smart suggestions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      {/* Hero Carousel Section */}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images.pexels.com/photos/3341574/pexels-photo-3341574.jpeg"
            alt="Streets of Paris"
          />
          <Carousel.Caption>
            <h3>Discover Your Next Destination</h3>
            <p>Explore the world's most beautiful cities.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images.pexels.com/photos/2598484/pexels-photo-2598484.jpeg"
            alt="Prague landmarks"
          />
          <Carousel.Caption>
            <h3>Plan Your Perfect Itinerary</h3>
            <p>Trekker helps you organize your trip, day by day.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg"
            alt="Ancient ruins in Rome"
          />
          <Carousel.Caption>
            <h3>Create Unforgettable Memories</h3>
            <p>Find hidden gems and top attractions with ease.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        {/* Call to Action Section */}
        <Row className="mt-4">
          <Col>
            <p className="lead">Ready to start your journey?</p>
            <Button variant="primary" size="lg" onClick={handleStart}>
              Start Planning Your Adventure
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
