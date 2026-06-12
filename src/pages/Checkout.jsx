import API from "../api/axios";

function Checkout() {

  const handlePayment =
    async () => {

    try {

      const { data } =
        await API.post(
          "/payment/create-order",
          {
            amount: 1000,
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

            await API.post(
              "/orders",
              {
                products: cartItems.map(
                  (item) => ({
                    product:
                      item.product._id,

                    quantity:
                      item.quantity,
                  })
                ),

                totalAmount: total,

                paymentStatus:
                  "Paid",
              }
            );

            alert(
              "Order Created Successfully"
            );

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