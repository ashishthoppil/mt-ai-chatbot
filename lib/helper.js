"use client";


export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('objectID');
    localStorage.removeItem('organization');
    localStorage.removeItem('botname');
    localStorage.removeItem('cw');
    localStorage.removeItem('color');
    window.location.href = '/';
  }
};