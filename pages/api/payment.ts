import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const razorpay = new Razorpay({
      key_id: "rzp_test_GcZZFDPP0jHtC4",
      key_secret: "6JdtQv2u7oUw7EWziYeyoewJ",
    });

    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: "receipt#1",
      payment_capture: 1,
    };

    try {
      const response = await razorpay.orders.create(options);

      res.status(200).json({
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
