import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link } from "react-router-dom";

export const Checkout = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    // const [clientSecret, setClientSecret] = useState('');
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const paymentIntent = () => {
    //         fetch('', {
    //             method:['POST'],
    //         })
    //     }
    // }, [])

    return(<>
        <h1>checkout</h1>
        <Link to="/session/payment">
            <h1>Go to payment</h1>
        </Link>
    </>)
}