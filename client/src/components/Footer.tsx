import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  return (
    <section>
      <h1>Footer</h1>
    </section>
  );
}
