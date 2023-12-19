import axios from "axios";

export const postUser = async (userData) => {
  try {
    const userRoute = "http://localhost:3001/api/user";
    const response = await axios.post(userRoute, userData);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

export const getBatches = async () => {
  try {
    const fetchBatchesRoute = "http://localhost:3001/api/fetchBatches";
    const response = await axios.get(fetchBatchesRoute);
    const { data } = response;
    const { batches } = data;
    return batches;
  } catch (error) {}
};

export const postDetails = async (details) => {
  try {
    const detailsRoute = "http://localhost:3001/api/details";
    const response = await axios.post(detailsRoute, details);
    const { data } = response;
    return data;
  } catch (err) {
    console.error(err);
  }
};
