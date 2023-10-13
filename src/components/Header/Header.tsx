import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { CustomButton } from "../CustomButton/CustomButton";
import { logout, selectUser } from "../../features/auth/authSlice";
import { changeRoleLang } from "../../utils/changeRoleLang";
import ltclogo from "../../assets/ltclogo.png";

export interface HeaderProps {
  role?: string;
}
export const Header = (props: HeaderProps) => {
  const { role } = props;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={style.header}>
      <Space>
        <Link to="/">
          <img src={ltclogo} className={style.img} alt="ltclogo" />
        </Link>
        {/* <TeamOutlined className={style.teamIcon} /> */}
        <Link to="/">
          <CustomButton type="ghost">
            <h1>
              Платформа
              {role && <span> ({changeRoleLang(role)})</span>}
            </h1>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <Button
          type="ghost"
          className={style.button}
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Выйти
        </Button>
      ) : (
        <Space>
          <Link to="/register">
            <Button
              type="ghost"
              className={style.button}
              icon={<UserOutlined />}
            >
              Зарегистрироваться
            </Button>
          </Link>
          <Link to="/login">
            <Button
              type="ghost"
              className={style.button}
              icon={<LoginOutlined />}
            >
              Войти
            </Button>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
