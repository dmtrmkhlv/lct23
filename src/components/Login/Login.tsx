import { Card, Form, Layout, Row, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { CustomInput } from "../CustomInput/CustomInput";
import { PasswordInput } from "../PasswordInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Paths } from "../../utils/paths";
import { CustomButton } from "../CustomButton/CustomButton";
import { UserAuth } from "../../types/types";
import { useLoginMutation } from "../../features/api/auth";
import { selectUser } from "../../features/auth/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = async (data: UserAuth) => {
    try {
      await loginUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={loginUserResult.isLoading}
            >
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
