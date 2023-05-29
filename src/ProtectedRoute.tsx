import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  check,
}: {
  children: any  ;
  check?: boolean; 
}) => {
  if (check) {
    if (localStorage.getItem("authToken")) {
      return <Navigate to="/List" replace />;
    }
  } else if (!localStorage.getItem("authToken")) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
