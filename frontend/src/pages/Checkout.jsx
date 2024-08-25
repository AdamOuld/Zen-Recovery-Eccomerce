import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import NavBar from '../components/NavBar';
import '../styles/Checkout.css';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import orderAPI from '../api/orderApi';
import axios from 'axios';
import { useNavigate } from 'react-router';

// Load Stripe (you can get your public key from the Stripe dashboard)
const stripePromise = loadStripe('pk_test_51PnjsLP11pgRpzbqJaBZgHPyZS2301hYJE2AdNp5SyLJqrx5xTonP68uyWjyLQKWH5PAeHQWcyIdnlXhIWeajfCD00FORIfp3y');

function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialShippingInfo = {
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  }
  const cart = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState('');
  const [shippingInfo, setShippingInfo] = useState(initialShippingInfo);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('https://zen-recovery-c41542f0e884.herokuapp.com/api/orders/create-payment-intent', {
          amount: cart.totalPrice * 100, // amount in cents
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };
    createPaymentIntent();
  }, [cart.totalPrice]);

  const handlePlaceOrder = async () => {

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
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
            phone: shippingInfo.phone,
          },
        },
      });

      if (error) {
        console.error('Payment error:', error.message);
        alert('An error occurred while processing your payment. Please try again.');
      } else if (paymentIntent.status === 'succeeded') {
        console.log(paymentIntent);
        // Payment was successful
        const orderData = {
          cartInfo: {
            items: cart.items.map(item => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
            })),
            totalPrice: cart.totalPrice,
          },
          shippingInfo,
          paymentMethod: {
            paymentMethodId: paymentIntent.id, // Use the actual payment intent ID
          },
        };

        // Call the API to create the order
        const response = await orderAPI.createOrder(orderData);

        // Handle successful order creation
        console.log('Order created successfully:', response);
        navigate('/order-confirmation', { state: { order: response, orderData: orderData } });
        setShippingInfo(initialShippingInfo);
        dispatch({ type: 'CLEAR_CART' });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again.');
    }
  };

  const placeOrderButton = () => {
    if (cart.items.length === 0) {
      return <button className='place-order' onClick={handleDisabledAlert}>Place Order</button>;
    } else {
      return <button className='place-order' onClick={handlePlaceOrder}>Place Order</button>;
    }
  }

  const handleDisabledAlert = () => {
    alert('Your cart is empty. Please add items to your cart before placing an order.');
  }

  return (
    <div className='checkout-page'>
      <NavBar />
      <div className='checkout-container'>
        <div className='checkout-information'>
          <div className='shipping-contact-info'>
            <h2>Shipping Information</h2>
            <form>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={shippingInfo.name}
                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                required
              />
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                required
              />
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                id='address'
                name='address'
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                required
              />
              <div className='city-state-zip'>
                <div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='state'>State</label>
                  <input
                    type='text'
                    id='state'
                    name='state'
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='zip'>Zip Code</label>
                  <input
                    type='text'
                    id='zip'
                    name='zip'
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    required
                  />
                </div>
              </div>
              <label htmlFor='phone'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                required
              />
            </form>
          </div>
          <div className='payment-info'>
            <h2>Payment Information</h2>
            <CardElement className='payment-card'/>
          </div>
          {placeOrderButton()}
        </div>
        <div className='checkout-summary'>
          <h2>Order Summary</h2>
          <List>
            {cart.items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
                  />
                  <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <div className='order-total'>
            <p>Shipping: Free</p>
            <h3>Total: ${cart.totalPrice}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;

