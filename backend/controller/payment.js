const { transporter } = require("../Config/transport");

const stripe = require("stripe")(
  "sk_test_51OeFSJSFf8eRBx5tMAjxOLySPy9kXqA3kagkWvo9henZ8HqWTyScZQBhMYnNHgBuHbygNrIxAPwuFsvD0Q42hXe000hS4DyKm9"
);

exports.makePayment = async (req, res) => {
  try {
    const { products } = req.body;

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: product.price_data.currency,
          product_data: {
            name: product.price_data.product_data.name,
          },
          unit_amount: product.price_data.unit_amount,
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success-payment",
      cancel_url: "http://localhost:3000/cancel-payment",
      customer_email: products[0].email,
      billing_address_collection: "required",
    });

   
    return res.status(200).json({ id: session.id,
      message:session
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};
