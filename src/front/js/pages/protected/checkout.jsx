import React, { useState, useEffect, useContext } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { FaCcVisa, FaCcMastercard, FaRegCreditCard, BsCalendarDate} from "react-icons/fa6";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";



export const Checkout = () => {
  const {store, actions} = useContext(Context)

  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/create-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: store.cartTotalAmount * 100, currency: 'usd' })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.client_secret));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    setLoading(false);

    if (error) {
      console.log('[error]', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
      navigate('/session/succeeded')
    } else {
      console.log('some error');
    }
  };

  return (<>
    <form className="w-80 bg-white p-6 rounded-lg shadow-lg mx-auto space-y-4" onSubmit={handleSubmit}>
      <p>Precio: {store.cartTotalAmount} € <i class="fa-solid fa-sack-dollar fa-bounce"></i></p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>&nbsp;
        <FaCcVisa style={{fontSize:"30px", color:"blue"}}/>&nbsp;<FaCcMastercard style={{fontSize:"30px", color:"red"}}/>
        &nbsp;<FaRegCreditCard style={{fontSize:"30px", color:"black"}}/>
        <div className="border border-gray-300 p-2 rounded-md">
          <CardNumberElement className="w-full" />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
          &nbsp;<i className="fa-solid fa-calendar-days" style={{fontSize:"25px", color:"black"}}></i>
          <div className="border border-gray-300 p-2 rounded-md">
            <CardExpiryElement className="w-full" />
          </div>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
          &nbsp;<i className="fa-solid fa-user-shield" style={{color:"black", fontSiz:"25px"}}></i>
          <div className="border border-gray-300 p-2 rounded-md">
            <CardCvcElement className="w-full" />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        style={{boxSizing:"border-box", borderRadius: "99rem", borderWidth: "2px", fontSize:"18px"}}
        disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
    </>);
};