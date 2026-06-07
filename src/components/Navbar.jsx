import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const token = useSelector(
    (state) => state.auth.token
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  return (
    <nav>
      <Link to="/">
        ShopSphere
      </Link>

      <Link to="/cart">
        Cart ({cartItems.length})
      </Link>

      <Link to="/wishlist">
        Wishlist
      </Link>

      {!token ? (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>
      ) : (
        <Link to="/orders">
          Orders
        </Link>
      )}
    </nav>
  );
}

export default Navbar;