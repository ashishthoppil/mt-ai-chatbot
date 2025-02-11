"use client";

export const checkAuth = () => {
    if (localStorage.getItem('objectID')) {
        return true;
    }
    return false;
}

export const logout = () => {
    if (localStorage.getItem('objectID')) {
        localStorage.removeItem('objectID');
        window.location.href = '/';
    }
}