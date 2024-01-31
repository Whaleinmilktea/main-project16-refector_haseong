import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// useCheckLoginStatus
// useCheckNotLoginStatus

export function useLoginCheck(isLoggedIn : boolean, endpoint : string, message : string) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      alert(message);
      navigate(endpoint);
    }
  }, []);
}

export function useNoLoginCheck(isLoggedIn : boolean, endpoint : string, message : string) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      alert(message);
      navigate(endpoint);
    }
  }, []);
}
