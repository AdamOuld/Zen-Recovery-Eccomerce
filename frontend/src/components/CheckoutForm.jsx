import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../styles/CheckoutForm.css';

function CheckoutForm({ shippingInfo }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment intent on the server
    const { data: clientSecret } = await axios.post('/api/payment_intents', {
      amount: 1000, // Replace with actual amount
      shippingInfo, // Send shipping info to backend if needed
    });

    // Confirm the card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.zip,
          },
        },
      },
    });

    if (error) {
      console.log('[error]', error);
      // Handle error
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      // Handle success (e.g., redirect to success page)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className='place-order'>
        Place order
      </button>
    </form>
  );
}

export default CheckoutForm;
