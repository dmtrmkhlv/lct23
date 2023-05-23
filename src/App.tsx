import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Paths } from "./utils/paths";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import { ConfigProvider, theme } from "antd";
import ru_RU from "antd/locale/ru_RU";

const router = createBrowserRouter([
  {
    path: Paths.main,
    element: <Main />,
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
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
      locale={ru_RU}
    >
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </ConfigProvider>
  );
}

export default App;
