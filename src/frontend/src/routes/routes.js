import { createBrowserRouter } from "react-router-dom";

//pages
import { Welcome } from "../pages/Welcome";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Library } from "../pages/Library";
import { Help } from "../pages/Help";
import { NewGame } from "../pages/NewGame";


export const router = createBrowserRouter([
  {
    path: "",
    element: <Welcome />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "library",
    element: <Library />,
  },
  {
    path: "help",
    element: <Help />,
  },
  {
    path: "newGame",
    element: <NewGame />,
  },
]);
