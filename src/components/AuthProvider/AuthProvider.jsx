import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const storage = window.localStorage;
  const navigate = useNavigate();

  useEffect(() => {
    if (!storage.getItem("token")) {
      return navigate("/login");
    }
    if (storage.getItem("token") === "") {
      return navigate("/login");
    }
  }, [storage, navigate]);

  return <> {children}</>;
};

export default AuthProvider;
