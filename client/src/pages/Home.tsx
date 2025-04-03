import { useNavigate } from "react-router-dom";
import "../styles/Homepage/homepage.scss";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="main-homepage">
      <h1>Welcome to Extensions</h1>
      <button type="button" onClick={() => navigate("/login")}>
        Connect
      </button>
    </main>
  );
}
