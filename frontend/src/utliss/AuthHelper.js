
export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');
export const isLoggedIn = () => !!getToken();
export const setAuthData = (token, username) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
};
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};
