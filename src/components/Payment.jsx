import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51RK23tJiTAK6oe07vw1C8L7nBHNhRG6JWwcbDfBh92ED5jpJksOGdF0dmS0as5ocInvtrMUB7UG686NS2tUvPCkB00ITDP1l0z");

const CheckoutForm = ({ amount, bookingDetails }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [error, setError] = useState("");
    const [token] = useState(localStorage.getItem("token") || '');

    useEffect(() => {
        axios
            .post("http://localhost:5000/api/payment", { amount }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((err) => {
                console.error("Payment setup failed:", err);
                setError("Failed to initialize payment. Please login & try again.");
            });
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);
        setPaymentStatus("");
        setError("");

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Customer Name",
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
            setPaymentStatus("failed");
        } else if (result.paymentIntent.status === "succeeded") {
            setPaymentStatus("succeeded");
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/book",
                    bookingDetails
                );
                if (res.data.message) {
                    navigate("/bookingsuccess");
                } else {
                    setError("Payment succeeded, but booking failed.");
                }
            } catch (err) {
                console.error("Booking error:", err);
                setError("Payment succeeded, but booking could not be completed.");
            }
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-10 p-6 border border-gray-200 shadow-md bg-white rounded-lg">  {/* Increased width */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Card Information
                    </label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#333',
                                    letterSpacing: '0.025em',
                                    fontFamily: 'Arial, sans-serif',
                                    '::placeholder': {
                                        color: '#a0aec0',
                                    },
                                    padding: '14px 20px',
                                    height: '48px',
                                    width: '100%',
                                },
                                invalid: {
                                    color: '#e53e3e',
                                },
                            },
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md bg-white"
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm p-2 bg-red-100 border border-red-200 rounded">
                        {error}
                    </div>
                )}

                {paymentStatus === "succeeded" && (
                    <div className="text-green-600 text-sm p-2 bg-green-100 border border-green-200 rounded">
                        Payment successful! Redirecting...
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full py-3 px-5 font-semibold text-white rounded-md transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Processing Payment..." : `Pay $${amount}`}
                </button>
            </form>
        </div>
    );
};

const StripeCheckout = ({ totalAmount, bookingDetails }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm amount={totalAmount} bookingDetails={bookingDetails} />
    </Elements>
);

export default StripeCheckout;
