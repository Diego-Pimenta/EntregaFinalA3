import { createBrowserRouter } from "react-router-dom";

//pages
import { Welcome } from "../pages/Welcome";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";

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
    path: "cadastro",
    // element: <Cadastro />,
  },
  {
    path: "home",
    // element: <Home />,
    children: [
      {
        path: "home",
        // element: <Home />,
      },
    ],
  },
]);
