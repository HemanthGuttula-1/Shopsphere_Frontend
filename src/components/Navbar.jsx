import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {

  const dispatch = useDispatch();

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
        <>
          <Link to="/orders">
            Orders
          </Link>
          <Link to='/checkout'>
            Pay Now 
          </Link>

          <button
            onClick={() =>
              dispatch(logout())
            }
          >
            Logout
          </button>
        </>
      )}

    </nav>
  );
}

export default Navbar;