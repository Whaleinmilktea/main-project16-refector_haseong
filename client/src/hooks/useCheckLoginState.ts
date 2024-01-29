import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLoginStatus(isLoggedIn : boolean, endpoint : string, message : string) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      alert(message);
      navigate(endpoint);
    }
  }, []);
}