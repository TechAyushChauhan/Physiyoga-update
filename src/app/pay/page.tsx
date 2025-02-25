"use client";
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [responseId, setResponseId] = useState('');
  const [responseState, setResponseState] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount) => {
    try {
      const response = await axios.post('/api/payment', {
        amount: amount * 100,
        currency: 'INR',
      });
      handleRazorpayScreen(response.data.amount);
    } catch (error) {
      setErrorMessage('Failed to create order. Please try again.');
      console.error('Error creating order:', error);
    }
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Failed to load Razorpay SDK. Please try again.');
      return;
    }

    const options = {
      key: 'rzp_test_GcZZFDPP0jHtC4',
      amount,
      currency: 'INR',
      name: 'Papaya Coders',
      description: 'Payment to Papaya Coders',
      image: 'https://papayacoders.com/demo.png',
      handler: (response) => {
        setResponseId(response.razorpay_payment_id);
        setErrorMessage('');
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      theme: {
        color: '#F4C430',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = async (e) => {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;

    try {
      const response = await axios.get(`/payment/${paymentId}`);
      setResponseState(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch payment details. Please try again.');
      console.error('Error fetching payment:', error);
    }
  };

  return (
    <div className="App">
      <h1>Razorpay Integration</h1>

      <button onClick={() => createRazorpayOrder(100)}>Pay ₹100</button>
      {responseId && <p>Payment ID: {responseId}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <h2>Verify Payment</h2>
      <form onSubmit={paymentFetch}>
        <input
          type="text"
          name="paymentId"
          placeholder="Enter Payment ID"
          required
        />
        <button type="submit">Fetch Payment</button>
      </form>

      {responseState.length !== 0 && (
        <div>
          <h3>Payment Details:</h3>
          <ul>
            <li>Amount: ₹{responseState.amount / 100}</li>
            <li>Currency: {responseState.currency}</li>
            <li>Status: {responseState.status}</li>
            <li>Method: {responseState.method}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
