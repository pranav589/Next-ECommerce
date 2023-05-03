import NextCors from "nextjs-cors";
import auth from "../../../middleware/auth";

const stripeSecretKey = process.env.STRIPE.SECRET_KEY;

const stripe = require("stripe")(`${stripeSecretKey}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await auth(req, res);
      if (result.id) {
        const { cart, userId, orderId, total } = req.body;

        const line_items = cart.map((item) => {
          return {
            price_data: {
              currency: "INR",
              product_data: {
                name: item.productId?.title,
                images: [item.productId.images[0].url],
                description: item.productId.description,
                metadata: {
                  id: item.productId._id,
                },
              },
              unit_amount:
                item?.productId?.discount > 0
                  ? item?.productId?.discountPrice * 100
                  : item.productId.price * 100,
            },
            quantity: item.quantity,
          };
        });

        const customer = await stripe.customers.create({
          metadata: {
            userId: userId,
            cart: JSON.stringify(cart),
            orderId: orderId,
          },
        });

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          customer: customer.id,
          line_items: line_items,
          mode: "payment",
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });

        res.json({ url: session.url, session: session });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
