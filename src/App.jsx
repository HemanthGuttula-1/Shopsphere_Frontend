import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from './pages/Orders'
import Checkout from "./pages/Checkout";
import MainLayout from "./layouts/MainLayout";
import ProductDetails from "./pages/ProductDetails";

function App() {
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;