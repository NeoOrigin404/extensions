// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import ErrorPage from "./pages/Errorpage/ErrorPage";
import ExtensionsHome from "./pages/Extensions/ExtensionsHome";
import Home from "./pages/Home";
import LoginPage from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/Signup";

import { getExtensions } from "./services/request";
import { AuthProvider } from "./services/Context/AuthContext";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/extensions",
        element: <ExtensionsHome />,
        loader: async () => ({
          extensions: await getExtensions(),
        }),
      },
    ],
  },
]);

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
