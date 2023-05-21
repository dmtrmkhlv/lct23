import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Paths } from "./utils/paths";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: Paths.main,
    element: <MainPage />,
  },
  {
    path: Paths.login,
    element: <LoginPage />,
  },
  {
    path: Paths.register,
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <Auth>
      <RouterProvider router={router} />
    </Auth>
  );
}

export default App;
