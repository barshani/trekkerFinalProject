// src/pages/AttractionView.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAttraction, getAttractions, deleteAttraction, updateAttraction } from "../services/apiService";
import { Attraction } from "./AttractionPage";

function AttractionView() {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAttractions();
    }, []);

    const fetchAttractions = async () => {
        try {
            const data = await getAttractions();
            const pendingData = data.filter(attraction => !attraction.aproved);
            setAttractions(pendingData);
        } catch (err) {
            console.error(err);
            setError('Failed to load attractions');
        } finally {
            setLoading(false);
        }
    };
    const handleApprove = async (id?: string) => {
        if (!id) return;
        try {
            const attraction = await getAttraction(id);
            const newAttraction: Attraction = {
                name: attraction.name,
                city: attraction.city,
                description: attraction.description,
                imageUrl: attraction.imageUrl,
                mapUrl: attraction.mapUrl,
                details: attraction.details,
                openingHours: attraction.openingHours,
                aproved: true,
            };
            attraction.aproved = true;
            await updateAttraction(id,newAttraction);
            toast.success('Attraction approved successfully');
            setAttractions(prev => prev.filter(attr => attr._id !== id));
        } catch (err) {
            console.error(err);
            toast.error('Failed to approve attraction');
        }
    };


    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm('Are you sure you want to delete this attraction?')) return;

        try {
            await deleteAttraction(id);
            toast.success('Attraction deleted successfully');
            setAttractions(prev => prev.filter(attr => attr._id !== id));
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete attraction');
        }
    };

    if (loading) return <p className="text-center mt-5">Loading attractions...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Attractions</h2>
            <div className="row">
                {attractions.length === 0 && <p>No attractions added yet.</p>}
                {attractions.map(attraction => (
                    <div key={attraction._id} className="col-md-6 mb-4">
                        <div className="card h-100">
                            {attraction.imageUrl && (
                                <img src={attraction.imageUrl} className="card-img-top" alt={attraction.name} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{attraction.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{attraction.city}</h6>
                                <p className="card-text">{attraction.description}</p>
                                <p><strong>Details:</strong> {attraction.details}</p>
                                <p><strong>Opening Hours:</strong> {attraction.openingHours}</p>
                                <a href={attraction.mapUrl} target="_blank" rel="noopener noreferrer" className="card-link">
                                    View on Map
                                </a>
                            </div>
                            <div className="card-footer text-start">
                                <button
                                    className="btn btn-outline-success btn-sm"
                                    onClick={() => handleApprove(attraction._id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(attraction._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AttractionView;
