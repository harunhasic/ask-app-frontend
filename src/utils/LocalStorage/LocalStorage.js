  
import { decode } from "jsonwebtoken";

export function setSession(user, token) {
    localStorage.setItem('askapp-user', JSON.stringify(user));
    localStorage.setItem('askapp-token', token);
}

export function removeSession() {
    localStorage.removeItem('askapp-token');
    localStorage.removeItem('askapp-user');
};

export function getUserId() {
    const user = localStorage.getItem('askapp-user');
    return user ? JSON.parse(user).id : null;
};

export function getUser() {
    const user = localStorage.getItem('askapp-user');
    return user ? JSON.parse(user) : null;
};

export function saveUser(user) {
    localStorage.setItem('askapp-user', JSON.stringify(user));
}

export function getToken() {
    return localStorage.getItem('askapp-token') || null;
}

export function isTokenValid() {
    const token = getToken();
    if (token === null)
        return false;
    const exp = decode(token, { complete: true }).payload.exp;
    return Date.now() < exp * 1000;
}