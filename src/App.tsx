import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Paths } from "./utils/paths";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import { ConfigProvider, theme } from "antd";
import ru_RU from "antd/locale/ru_RU";
import { NotFoundPage } from "./pages/NotFoundPage";
import { User } from "./components/User/User";
import { UserEdit } from "./components/UserEdit/UserEdit";
import { Status } from "./components/Status/Status";
import { UserAdd } from "./components/UserAdd/UserAdd";
import { CandidatApplyEdit } from "./components/Candidat/CandidatApplyEdit";
import { CandidatApplyInfo } from "./components/Candidat/CandidatApplyInfo";

const { useToken } = theme;

// console.log(theme);

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
  {
    path: Paths.notfound,
    element: <Status />,
  },
  {
    path: `${Paths.user}/:id`,
    element: <User />,
  },
  {
    path: `${Paths.userEdit}/:id`,
    element: <UserEdit />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: Paths.userAdd,
    element: <UserAdd />,
  },
  {
    path: `${Paths.userApplyEdit}`,
    element: <CandidatApplyEdit />,
  },
  {
    path: `${Paths.userApply}/:id`,
    element: <CandidatApplyInfo />,
  },
]);

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: "#038d77",
        },
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
