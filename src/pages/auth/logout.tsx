import { useEffect } from "react";
import tauriServices from "../../services/tauriServices";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/ui";

export default function LogoutPage() {
  const {} = useLoginPage();

  return (
    <div className="h-screen grid place-items-center">
      <Loading name="Logout" />
    </div>
  );
}

function useLoginPage() {
  const auth = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      tauriServices.auth
        .logout()
        .then(() => auth.logout())
        .then(() => navigation("/"));
    }, 2000)
  }, []);

  return {  };
}
