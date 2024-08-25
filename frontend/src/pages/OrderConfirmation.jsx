import React from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/OrderConfirmation.css';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order; // Access the passed order data
  const orderData = location.state?.orderData; // Access the passed order data

  if (!order) {
    return <div>No order data found.</div>;
  }

    const handleReturnHome = () => {
        navigate('/');
    }

  return (
    <div>
        <NavBar />
        <div className='order-confirmation'>
            <div className='order-confirmation-info'>
                <h1>Order Confirmation</h1>
                <p>Thank you for your order, {orderData.shippingInfo.name}. A confirmation has been sent to your email.</p>
                <p>Order ID: {order.orderId}</p>
                <p>Total Price: ${orderData.cartInfo.totalPrice}</p>
                <button onClick={handleReturnHome}>Continue Shopping</button>
            </div>
        </div>
    </div>
  );
};

export default OrderConfirmation
