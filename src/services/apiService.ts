import { getToken } from "../auth/TokenManager";
import { User } from "../auth/SignUp";
import { loginUser } from "../auth/Login";
import { Attraction } from "../Pages/AttractionPage";
const serverUrl = 'http://localhost:3001/';
const usersUrl = `${serverUrl}users/`;
const attractionsUrl = `${serverUrl}attractions/`;

// Helper to handle API responses and errors
async function handleResponse(res: Response) {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ 
            message: `Request failed with status: ${res.status} ${res.statusText}` 
        }));
        throw new Error(errorData.message || 'An unknown error occurred');
    }
    return res.json();
}

// ----- User API -----
export async function signup(user: User): Promise<any> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return handleResponse(res);
}

export async function login(user: loginUser): Promise<any> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return handleResponse(res);
}


// Get all attractions
export async function getAttractions(): Promise<Attraction[]> {
    const res = await fetch(attractionsUrl);
    return handleResponse(res);
}

// Get all attractions for a specific city
export async function getAttractionsByCity(cityName: string): Promise<Attraction[]> {
    const res = await fetch(`${attractionsUrl}city/${cityName.toLowerCase()}`);
    return handleResponse(res);
}

// Get a single attraction by ID
export async function getAttraction(id: string): Promise<Attraction> {
    const res = await fetch(`${attractionsUrl}${id}`);
    return handleResponse(res);
}

// Add a new attraction
export async function addAttraction(attraction: Attraction): Promise<Attraction> {
    const token = getToken();
    const res = await fetch(attractionsUrl, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(attraction)
    });
    return handleResponse(res);
}

// Update an attraction
export async function updateAttraction(id: string, attraction: Attraction): Promise<Attraction> {
    const token = getToken();
    const res = await fetch(`${attractionsUrl}${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(attraction)
    });
    return handleResponse(res);
}

// Delete an attraction
export async function deleteAttraction(id: string): Promise<Attraction> {
    const token = getToken();
    const res = await fetch(`${attractionsUrl}${id}`, {
        method: 'DELETE',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    return handleResponse(res);
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) {
      // Avoids making a request with a null token
      return Promise.reject('No token found');
  }
  const res = await fetch(`${usersUrl}me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}