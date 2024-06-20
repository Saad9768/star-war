import { API_URL } from '../const';

export const fetchAssets = async (url) => {
  const response = await fetch(`${API_URL}${url}`);
  return response.json();
};
