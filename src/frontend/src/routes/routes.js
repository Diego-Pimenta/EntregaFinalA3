import { createBrowserRouter, Navigate } from "react-router-dom";

//pages
import { Welcome } from "../pages/Welcome";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Library } from "../pages/Library";
import { Help } from "../pages/Help";
import { NewGame } from "../pages/NewGame";
import { DetailsGame } from "../pages/DetailsGame";

const isAuthenticated = !!localStorage.getItem("token");
const redirectToLogin = () => <Navigate to="/login" replace />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: isAuthenticated ? <Error /> : <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: isAuthenticated ? <Home /> : redirectToLogin(),
  },
  {
    path: "/library",
    element: isAuthenticated ? <Library /> : redirectToLogin(),
  },
  {
    path: "/help",
    element: isAuthenticated ? <Help /> : redirectToLogin(),
  },
  {
    path: "/newGame",
    element: isAuthenticated ? <NewGame /> : redirectToLogin(),
  },
  {
    path: "/library/:id",
    element: isAuthenticated ? <DetailsGame /> : redirectToLogin(),
  },
]);
