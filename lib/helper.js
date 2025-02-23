"use client";


export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('objectID');
    window.location.href = '/';
  }
};

export const getAnalyticsDb = (org, id) => {
  return `${org.substring(0, 3)}_${id.substring(0, 5)}`
}