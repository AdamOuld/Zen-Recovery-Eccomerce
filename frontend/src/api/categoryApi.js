import axios from "axios";

const API_BASE_URL =
  "https://zen-recovery-c41542f0e884.herokuapp.com/api/categories";

const categoryAPI = {
  getCategoryById: async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw error;
    }
  },
  getAllCategories: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error;
    }
  },
};

export default categoryAPI;
