// src/api.js
export const API_BASE = process.env.REACT_APP_API_URL || "";

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/v1/health`);
  return res.json();
}
