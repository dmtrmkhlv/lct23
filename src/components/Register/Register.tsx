import { Card, Form, Layout, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../CustomInput/CustomInput";
import { PasswordInput } from "../PasswordInput";
import { CustomButton } from "../CustomButton/CustomButton";
import { Paths } from "../../utils/paths";
import { UserAuth } from "../../types/types";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useRegisterMutation } from "../../features/api/auth";
import { selectUser } from "../../features/auth/authSlice";

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data: UserAuth) => {
    try {
      await registerUser(data).unwrap();

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
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            {/* <CustomInput type="text" name="name" placeholder="Имя" /> */}
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirmPassword" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
