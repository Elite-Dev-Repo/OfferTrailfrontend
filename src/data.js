import api from "./api";

export const getJobs = async () => {
  try {
    const res = await api.get("myjobs/");
    return res.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const filterJobs = async (status) => {
  try {
    // Corrected query parameter syntax
    const res = await api.get(`myjobs/?status=${status}`);
    return res.data;
  } catch (error) {
    console.error("Error filtering jobs:", error);
    return [];
  }
};

export const deleteJob = async (id) => {
  try {
    // Corrected to use .delete method
    const res = await api.delete(`myjobs/${id}/`);
    return res.status === 204;
  } catch (error) {
    console.error("Error deleting job:", error);
    return false;
  }
};
