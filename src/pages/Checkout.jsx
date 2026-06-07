import API from "../api/axios";

function Checkout() {

  const handlePayment = async () => {

    try {

      const { data } = await API.post(
        "/payment/create-order",
        {
          amount: 1000,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "ShopSphere",

        description: "Order Payment",

        handler: async function (response) {

          console.log(response);

          alert(
            "Payment Successful"
          );

        },
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
        onClick={handlePayment}
      >
        Pay Now
      </button>

    </div>
  );
}

export default Checkout;