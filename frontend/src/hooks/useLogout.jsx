import { useNavigate } from "react-router-dom";
import { useProductContext } from "./useProductContext";
import { useAuthContext } from "./useAuthContext";
import { useBundleContext } from "./useBundleContext";
import { useBlogContext } from "./useBlogContext";
import { toast } from "react-toastify";

export const useLogout = () => {
  const navigate = useNavigate();

  const productContext = useProductContext();
  const authContext = useAuthContext();
  const bundleContext = useBundleContext();
  const BlogContext = useBlogContext();
  const logout = () => {
    localStorage.removeItem("user");
    productContext.dispatch({ type: "CLEAR_PRODUCTS" });
    bundleContext.dispatch({ type: "CLEAR_BUNDLES" });
    BlogContext.dispatch({ type: "CLEAR_BLOGS" });
    authContext.dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return { logout };
};
