import axios from "axios";

const API_BASE_URL =
  "https://zen-recovery-c41542f0e884.herokuapp.com/api/email";

const emailAPI = {
  subscribe: async (email) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/subscribe`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      alert(
        "Error subscribing to newsletter. Make sure you entered a valid email address and are not already subscribed!"
      );
      throw error;
    }
  },
};

export default emailAPI;
