import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  return (
    <section>
      <h1>Navbar</h1>
    </section>
  );
}
