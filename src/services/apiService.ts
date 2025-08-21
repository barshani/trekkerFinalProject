import { getToken } from "../auth/TokenManager";
import { User } from "../auth/SignUp";
import { loginUser } from "../auth/Login";
import { Attraction } from "../Pages/AttractionPage";
const serverUrl = 'http://localhost:3001/';
const usersUrl = `${serverUrl}users/`;
const attractionsUrl = `${serverUrl}attractions/`;

// ----- User API -----
export async function signup(user: User): Promise<any> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return res.json();
}

export async function login(user: loginUser): Promise<any> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return res.json();
}


// Get all attractions
export async function getAttractions(): Promise<Attraction[]> {
    const res = await fetch(attractionsUrl);
    return res.json();
}

// Get a single attraction by ID
export async function getAttraction(id: string): Promise<Attraction> {
    const res = await fetch(`${attractionsUrl}${id}`);
    return res.json();
}

// Add a new attraction
export async function addAttraction(attraction: Attraction): Promise<Attraction> {
    const token = getToken(); // optional auth token
    const res = await fetch(attractionsUrl, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(attraction)
    });
    return res.json();
}

// Update an attraction
export async function updateAttraction(id: string, attraction: Attraction): Promise<Attraction> {
    const token = getToken(); // optional auth token
    const res = await fetch(`${attractionsUrl}${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(attraction)
    });
    return res.json();
}

// Delete an attraction
export async function deleteAttraction(id: string): Promise<Attraction> {
    const token = getToken(); // optional auth token
    const res = await fetch(`${attractionsUrl}${id}`, {
        method: 'DELETE',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    return res.json();
}
