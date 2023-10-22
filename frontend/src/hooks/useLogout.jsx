import { useNavigate } from "react-router-dom";
import { useProductContext } from "./useProductContext";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
export const useLogout = () => {
  const navigate = useNavigate();

  const productContext = useProductContext();
  const authContext = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    productContext.dispatch({ type: "CLEAR_PRODUCTS" });
    authContext.dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return { logout };
};
