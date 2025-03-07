import React from 'react'
import { Checkout } from "../protected/checkout.jsx";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';



export const Payment = () => {
    const stripePromise = loadStripe('pk_test_51QtocuCZ14sPuAqBEZ5lyRH3RhWmWEz9lBbLzJ8gHRYhajmIw7me5Nb0KisiyfYKAL6yL7U8eOj5HGW88ZqyPOko00MmFPKHZB')
    return(<>
        <Elements stripe={stripePromise}>
            <Checkout/>
        </Elements>
    </>)
}