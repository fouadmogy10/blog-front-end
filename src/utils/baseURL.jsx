import axios from "axios";
const base_url = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}` });
export const fetchDataFromApi = async (url,headers) => {
  try {
    const { data } = await base_url.get(`${url}`, {
      headers,
    });
    return data;
  } catch (err) {
    return err;
  }
};
export default base_url;
