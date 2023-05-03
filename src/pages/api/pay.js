const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(`${stripeSecretKey}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "inr",
        metadata: { integration_check: "accept_a_payment" },
        receipt_email: email,
      });

      res.json({ client_secret: paymentIntent["client_secret"] });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
