import { useAuth } from "../contexts/AuthContext";
import { Dashboard, Welcome } from "../components/home";

export default function HomePage() {
  const auth = useAuth();
  
  return auth.status === "LOGGED_OUT" ? <Welcome/> : < Dashboard/>;
}