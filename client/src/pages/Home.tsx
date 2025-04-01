import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Welcome to Extensions</h1>
      <button type="button" onClick={() => navigate("/login")}>
        Connect
      </button>
    </main>
  );
}
