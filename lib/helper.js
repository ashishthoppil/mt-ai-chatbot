export const checkAuth = () => {
    // if (localStorage.getItem('objectID')) {
    if (true) {
        return true;
    }
    return false;
}

export const logout = () => {
    // if (localStorage.getItem('objectID')) {
    if (true) {
        // localStorage.removeItem('objectID');
        window.location.href = '/';
    }
}