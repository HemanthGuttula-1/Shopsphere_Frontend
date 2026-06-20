import API from "../api/axios";
import { useSelector } from 'react-redux'

function Checkout() {
  const cartItems = useSelector(
    (state) => state.cart.items
  )
  const total = cartItems.reduce(
      (sum, item) =>
        sum +
        item.product.price *
        item.quantity,
      0
  );
  const handlePayment =
    async () => {
    
    try {

      const { data } =
        await API.post(
          "/payment/create-order",
          {
            amount: total,
          }
        );

      const options = {
        key:
          import.meta.env.VITE_RAZORPAY_KEY,

        amount:
          data.amount,

        currency:
          data.currency,

        order_id:
          data.id,

        name:
          "ShopSphere",

        description:
          "Product Purchase",

        handler: async function (response) {
          try {

            const verify = await API.post(
              "/payment/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            if (verify.data.success) {

              await API.post(
                "/orders",
                {
                  totalAmount: total,
                  paymentStatus: "Paid",
                }
              );

              alert(
                "Order Created Successfully"
              );

            }

          } catch (error) {

            console.log(error);

          }
        }
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>
        Checkout
      </h1>

      <button
        onClick={
          handlePayment
        }
      >
        Pay Now
      </button>

    </div>
  );
}

export default Checkout;