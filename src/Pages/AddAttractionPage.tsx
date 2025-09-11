
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { addAttraction } from "../services/apiService";
import citiesData from '../Data/Cities.json';
import './AddAttractionPage.css';

interface City {
    name: string;
    country: string;
    description: string;
    flagUrl: string;
    imageUrl: string;
}

export interface Attraction {
    name: string;
    city: string;
    description: string;
    imageUrl: string;
    mapUrl: string;
    details: string;
    openingHours: string;
}

function AddAttractionPage() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Attraction>({
        name: '',
        city: '',
        description: '',
        imageUrl: '',
        mapUrl: '',
        details: '',
        openingHours: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            const addedAttraction = await addAttraction(formData);
            toast.success(`Attraction "${addedAttraction.name}" was added successfully!`);
            navigate('/attractionView');
        } catch (err) {
            setError('Failed to add attraction. Please try again.');
            toast.error('Failed to add attraction.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const cities: City[] = citiesData;

    return (
        <div className="add-attraction-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={7}>
                        <Card className="add-attraction-card">
                            <Card.Header className="text-center">
                                Add New Attraction
                            </Card.Header>
                            <Card.Body className="p-4 p-md-5">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    {error && <Alert variant="danger">{error}</Alert>}

                                    <Row className="g-3">
                                        <Col md={6}>
                                            <FloatingLabel controlId="attractionName" label="Attraction Name">
                                                <Form.Control type="text" placeholder="e.g., The Louvre Museum" name="name" value={formData.name} onChange={handleChange} required minLength={2} />
                                                <Form.Control.Feedback type="invalid">Please provide a name (at least 2 characters).</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>

                                        <Col md={6}>
                                            <FloatingLabel controlId="attractionCity" label="City">
                                                <Form.Select name="city" value={formData.city} onChange={handleChange} required>
                                                    <option value="">Select a city...</option>
                                                    {cities.map((city: City) => (
                                                        <option key={city.name} value={city.name.toLowerCase()}>{city.name}</option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">Please select a city.</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>

                                        <Col xs={12}>
                                            <FloatingLabel controlId="attractionDescription" label="Description">
                                                <Form.Control as="textarea" placeholder="A short description..." style={{ height: '100px' }} name="description" value={formData.description} onChange={handleChange} required minLength={3} />
                                                <Form.Control.Feedback type="invalid">Please provide a description (at least 3 characters).</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <FloatingLabel controlId="attractionDetails" label="Details">
                                                <Form.Control as="textarea" placeholder="More details about the attraction..." style={{ height: '100px' }} name="details" value={formData.details} onChange={handleChange} required minLength={6} />
                                                <Form.Control.Feedback type="invalid">Please provide details (at least 6 characters).</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>

                                        <Col md={6}>
                                            <FloatingLabel controlId="attractionImageUrl" label="Image URL">
                                                <Form.Control type="url" placeholder="https://example.com/image.jpg" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                                                <Form.Control.Feedback type="invalid">Please provide a valid image URL.</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>

                                        <Col md={6}>
                                            <FloatingLabel controlId="attractionMapUrl" label="Map URL">
                                                <Form.Control type="url" placeholder="https://maps.google.com/..." name="mapUrl" value={formData.mapUrl} onChange={handleChange} required />
                                                <Form.Control.Feedback type="invalid">Please provide a valid map URL.</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>

                                        <Col xs={12}>
                                            <FloatingLabel controlId="attractionOpeningHours" label="Opening Hours">
                                                <Form.Control type="text" placeholder="e.g., 9:00 AM - 5:00 PM" name="openingHours" value={formData.openingHours} onChange={handleChange} required minLength={5} />
                                                <Form.Control.Feedback type="invalid">Please provide opening hours (at least 5 characters).</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <Button variant="outline-secondary" onClick={() => navigate(-1)} disabled={isSubmitting}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="dark" disabled={isSubmitting}>
                                            {isSubmitting ? 'Adding...' : 'Add Attraction'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddAttractionPage;
