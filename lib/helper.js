"use client";


export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('objectID');
    window.location.href = '/';
  }
};