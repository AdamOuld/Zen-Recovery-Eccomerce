import axios from "axios";

const API_BASE_URL =
  "https://zen-recovery-c41542f0e884.herokuapp.com/api/products";

const productAPI = {
  getProductsByCategoryId: async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category ID:", error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },
};

export default productAPI;
