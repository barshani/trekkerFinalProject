// src/pages/AddAttraction.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addAttraction } from "../services/apiService";

export interface Attraction {
    id?: string;
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

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [mapUrl, setMapUrl] = useState('');
    const [details, setDetails] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [error, setError] = useState('');

    function validate(): boolean {
        if (!name || name.length < 2) {
            setError('*Name is required and must be at least 2 characters');
            return false;
        }
        if (!city || city.length < 2) {
            setError('*City is required and must be at least 2 characters');
            return false;
        }
        if (!description || description.length < 3) {
            setError('*Description is required and must be at least 3 characters');
            return false;
        }
        if (!imageUrl || imageUrl.length < 6) {
            setError('*Image URL is required and must be valid');
            return false;
        }
        if (!mapUrl || mapUrl.length < 6) {
            setError('*Map URL is required and must be valid');
            return false;
        }
        if (!details || details.length < 6) {
            setError('*Details are required and must be at least 6 characters');
            return false;
        }
        if (!openingHours || openingHours.length < 5) {
            setError('*Opening Hours are required');
            return false;
        }
        setError('');
        return true;
    }

    function handleClick() {
        if (!validate()) return;

        const newAttraction: Attraction = {
            name,
            city,
            description,
            imageUrl,
            mapUrl,
            details,
            openingHours
        };

        addAttraction(newAttraction)
            .then(json => {
                toast.success(`Attraction "${json.name}" added successfully`);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to add attraction');
                toast.error('Failed to add attraction');
            });

        // Optional: clear fields
        setName('');
        setCity('');
        setDescription('');
        setImageUrl('');
        setMapUrl('');
        setDetails('');
        setOpeningHours('');
    }

    return (
        <div style={{ paddingTop: '10vh' }}>
            <div className="w-75 mx-auto">
                <h2 className="mb-4">Add New Attraction</h2>

                <div className="row mb-3">
                    <input
                        className="form-control me-3 col"
                        type="text"
                        placeholder="Name*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="form-control me-3 col"
                        type="text"
                        placeholder="City*"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="row mb-3">
                    <textarea
                        className="form-control me-3 col"
                        placeholder="Description*"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        className="form-control me-3 col"
                        type="text"
                        placeholder="Image URL*"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <div className="row mb-3">
                    <input
                        className="form-control me-3 col"
                        type="text"
                        placeholder="Map URL*"
                        value={mapUrl}
                        onChange={(e) => setMapUrl(e.target.value)}
                    />
                    <textarea
                        className="form-control me-3 col"
                        placeholder="Details*"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                <div className="row mb-3">
                    <input
                        className="form-control me-3 col"
                        type="text"
                        placeholder="Opening Hours*"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                    />
                </div>

                <div className="row mx-auto w-50 pb-3 gap-1">
                    <div className="text-center text-danger">{error}</div>
                    <button className="btn btn-outline-secondary col w-50">
                        <Link to="/attractions" className="nav-link">
                            Cancel
                        </Link>
                    </button>
                    <button className="btn btn-outline-success col w-50" onClick={handleClick}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddAttractionPage;
