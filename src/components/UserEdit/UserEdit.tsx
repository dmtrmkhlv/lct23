import { Row } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../features/api/usersAPI";
import Layout from "../../layouts/Layout";
import { User } from "../../types/types";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../utils/paths";
import { UserForm } from "../UserForm/UserForm";

export const UserEdit = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [editUser] = useEditUserMutation();

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  const usersCompare = (userInit: any, user: any): boolean => {
    return JSON.stringify(userInit) === JSON.stringify(user);
  };

  const handleEditUser = async (user: User) => {
    console.log(
      usersCompare(data, {
        ...data,
        ...user,
      })
    );

    try {
      const editedUser = {
        ...data,
        ...user,
      };

      await editUser(editedUser).unwrap();

      navigate(`${Paths.status}/created`);
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
        <UserForm
          onFinish={handleEditUser}
          title="Редактировать пользователя"
          user={data}
          btnText="Сохранить"
          error={error}
          btnDisable={false}
        />
      </Row>
    </Layout>
  );
};
