import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import CardInput from "../CardInput";
import { apiCall } from "@/utils/apiCall";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function PaymentComp() {
  const router = useRouter();
  const { orderId } = router.query;
  const { state } = useContext(DataContext);
  const { auth, cart } = state;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const orderPayment = async (amount, paymentId, method, paymentStatus) => {
    try {
      const data = {
        orderId: orderId,
        name: auth?.user?.id,
        amount: Math.floor(amount / 100),
        paymentId: paymentId,
        method: method?.[0],
        subTotal: amount,
        paymentStatus: paymentStatus === "succeeded" ? true : false,
        dateOfPayment: new Date(Date.now()),
      };
      const res = await apiCall("PUT", "order/payment", token, data);
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleSubmitPay = async (event) => {
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const res = await axios.post("/api/pay", {
      email: email,
      amount: cart?.totalAmount,
    });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(`${clientSecret}`, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const { amount, id, payment_method_types, status, created } =
          result.paymentIntent;
        orderPayment(amount, id, payment_method_types, status, created);
        setLoading(false);
        router.push(`/success?paymentId=${result?.paymentIntent?.id}`);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth?.user) {
      setEmail(auth?.user?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{
        maxWidth: "500px",
        margin: "10% auto",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
        }}
      >
        <TextField
          label="Email"
          id="outlined-email-input"
          helperText={`Email you'll recive updates and receipts on`}
          margin="normal"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <CardInput />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#539165",
                marginLeft: "50%",
                marginTop: "20px",
              }}
              size={25}
            />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "#539165",
                "&:hover": { background: "#539165" },
                height: "45px",
                borderRadius: "30px",
                fontSize: "18px",
              }}
              onClick={() => handleSubmitPay()}
              disabled={!orderId || !stripe || !email || loading}
            >
              Pay
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentComp;
