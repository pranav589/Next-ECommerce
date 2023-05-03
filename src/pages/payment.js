import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentComp from "../../components/PaymentComp";

const publishKey = process.env.STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(
  "pk_test_51KP2h3SJSZkjo118oHaM4govZoMOJX54WjbFjiax1rNlZbXzb65ZAefr7nqxx16OIlrCVtBXROJv5AfnJZe3kqk200MupJcEpQ"
);

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentComp />
    </Elements>
  );
}

export default Payment;
