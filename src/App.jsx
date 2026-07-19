import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import API from './api/axios'

import { useSelector,useDispatch } from "react-redux";
import { setCart } from './redux/cartSlice'
import { setWishlist } from './redux/wishlistSlice'
import { useEffect } from 'react'

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from './pages/Orders'
import Checkout from "./pages/Checkout";
import MainLayout from "./layouts/MainLayout";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from './pages/Wishlist'
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import ManageProducts from "./pages/ManageProduct";
import AdminOrders from "./pages/AdminOrders";
import AddProduct from "./pages/Admin/AddProduct"

function App() {

  const dispatch = useDispatch()

  const token  = useSelector( state => state.auth.token )
  const fetchCart = async () => {
    try {

      const { data } = await API.get("/cart");

      dispatch(setCart(data?.products || []));

    } catch (error) {

      console.log(error);

    }

  };

  const fetchWishlist = async () => {

    try {

      const { data } = await API.get("/wishlist");

      dispatch(setWishlist(data?.products) || []);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    if (token) {
      console.log(`Token:${token}`)
      fetchCart();

      fetchWishlist();

    }

  }, [token]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route
          path="/"
          element={
            <MainLayout>
               <Home />
            </MainLayout>
          }
        />

        <Route
          path='/cart'
          element={<Cart/>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/wishlist"
          element={ <Wishlist />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          }
        />

        <Route 
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct/>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;