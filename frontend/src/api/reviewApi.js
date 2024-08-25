import axios from "axios";
const API_BASE_URL =
  "https://zen-recovery-c41542f0e884.herokuapp.com/api/reviews";

const reviewAPI = {
  getReviewsByProductId: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews by product ID:", error);
      throw error;
    }
  },
  submitReview: async (reviewData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/submit-review`,
        reviewData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  },
};

export default reviewAPI;
