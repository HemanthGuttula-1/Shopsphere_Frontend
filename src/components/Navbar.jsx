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

  const user = useSelector(
    state => state.auth.user
  )
  return (
    <nav>

      <Link to="/">
        ShopSphere
      </Link>

      {
        user?.role === "admin" && (
            <>
                <Link to="/admin">
                  Admin
                </Link>

                <Link
                  to="/admin/orders"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Manage Orders
                </Link>
            </>
        )

      }

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