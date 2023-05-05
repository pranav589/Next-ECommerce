import Stripe from "stripe";
import { buffer } from "micro";
import Orders from "../../models/orderModel";

import Products from "../../models/productModel";
import db from "@/utils/connectDB";

const stripeSecretKey = process.env.STRIPE.SECRET_KEY;
const endpointSecret = `${process.env.STRIPE_ENDPOINT_SECRET}`;

const stripe = new Stripe(`${stripeSecretKey}`, {
  apiVersion: "2020-08-27",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const createOrder = async (customer, data) => {
  try {
    await db.connect();
    const items = JSON.parse(customer.metadata.cart);
    const updateOrder = await Orders.findOneAndUpdate(
      { _id: customer.metadata.orderId },
      {
        $set: {
          user: customer.metadata.userId,
          customerId: data.customer,
          total: data.amount_total / 100,
          paymentId: data.payment_intent,
          method: data.payment_method_types[0],
          subTotal: data.amount_subtotal / 100,
          payment_status: data.payment_status === "paid" ? true : false,
          dateOfPayment: Date.now(),
        },
      }
    );

    items.filter((item) => {
      return sold(
        item.productId._id,
        item.quantity,
        item.productId?.inStock,
        item.productId?.sold
      );
    });
    await db.disconnect();
  } catch (error) {
    return console.log("createOrder", error.message);
  }
};

const sold = async (id, quantity, oldInStock, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: quantity + oldSold,
    }
  );
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    let event;
    let data;
    console.log({ event, data });
    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
      data = event.data.object;
    } catch (error) {
      console.log("handler", error);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((err) => {
          console.log("catch", err);
        });
    }
    res.send();
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
