"use client";

export const checkAuth = () => {
  try {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('objectID');
    }
    return false;
  } catch (e) {
    console.log('Error:', e);
    return false;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('objectID');
    window.location.href = '/';
  }
};