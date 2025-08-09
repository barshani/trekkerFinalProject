import { getToken, getUserID, isAdmin } from "../auth/TokenManager";
import { User } from "../auth/SignUp";
import { loginUser } from "../auth/Login";
const serverUrl = 'http://localhost:3001/';
const usersUrl = `${serverUrl}users/`;
export async function signup(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}
export async function login(user:loginUser): Promise<loginUser> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}