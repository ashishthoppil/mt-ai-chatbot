"use client";


export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('objectID');
    localStorage.removeItem('organization');
    localStorage.removeItem('botname');
    localStorage.removeItem('cw');
    localStorage.removeItem('color');
    localStorage.removeItem('al');
  }
};

export const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}