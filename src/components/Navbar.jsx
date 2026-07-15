import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearCart } from '../redux/cartSlice'
import { clearWishlist } from "../redux/wishlistSlice";

function Navbar() {

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const cartItems = useSelector((state) => state.cart.items);
  
  console.log("Navbar cart:", cartItems);

  const user = useSelector(state => state.auth.user)

  return (
    <nav className="bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          ShopSphere
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className="hover:text-yellow-400 transition"
              >
                Admin
              </Link>

              <Link
                to="/admin/orders"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
              >
                Manage Orders
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="hover:text-cyan-400 transition"
          >
            🛒 Cart ({cartItems?.length})
          </Link>

          <Link
            to="/wishlist"
            className="hover:text-pink-400 transition"
          >
            ❤️ Wishlist
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-green-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/orders"
                className="hover:text-yellow-400 transition"
              >
                Orders
              </Link>

              <Link
                to="/checkout"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
              >
                💳 Pay Now
              </Link>

              <button
                onClick={() => {
                  dispatch(clearCart())
                  dispatch(clearWishlist())
                  return dispatch(logout())
                }}

                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;