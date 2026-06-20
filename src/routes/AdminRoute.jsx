import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {

  const user = useSelector(
    (state) => state.auth.user
  );

  const token = useSelector(
    (state) => state.auth.token
  );

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;