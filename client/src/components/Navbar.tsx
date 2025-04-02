import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/Context/AuthContext";
import { logoutMember } from "../services/request";

export default function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  const disconnect = () => {
    logoutMember(setRole, navigate);
  };

  return (
    <section>
      <h1>Navbar</h1>
      {role === "anonymous" ? null : (
        <button type="button" onClick={disconnect}>
          Log out
        </button>
      )}
    </section>
  );
}
