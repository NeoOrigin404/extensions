import { Outlet } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
