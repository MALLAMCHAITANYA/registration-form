// API URL helper
// Local dev: uses Vite proxy (empty string = same origin)
// Production: set VITE_API_URL in Vercel to your Render backend URL

const API_URL = import.meta.env.VITE_API_URL || '';

export function apiUrl(path) {
  return `${API_URL}${path}`;
}
