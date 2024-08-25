import axios from "axios";

const API_BASE_URL =
  "https://zen-recovery-c41542f0e884.herokuapp.com/api/orders";

const orderAPI = {
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(
        "https://zen-recovery-c41542f0e884.herokuapp.com/api/orders/create-order",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error; // Rethrow to handle errors in the component
    }
  },

  createPaymentIntent: async (paymentIntentData) => {
    const response = await axios.post(
      `${API_BASE_URL}/create-payment-intent`,
      paymentIntentData
    );
    return response.data;
  },
};

export default orderAPI;
