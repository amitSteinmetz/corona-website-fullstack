export function isAuthenticated() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expireTime");

  const isLoggedIn = !!token;
  const isExpired = expiration && new Date() > new Date(expiration);

  return isLoggedIn && !isExpired;
}
