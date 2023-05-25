import { Row } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import Layout from "../../layouts/Layout";
import { UserType } from "../../types/types";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { objCompare } from "../../utils/objCompare";
import { Paths } from "../../utils/paths";
import { UserForm } from "../UserForm/UserForm";
import Load from "../Load/Load";

export const UserEdit = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [editUser] = useEditUserMutation();
  const userOwner = useSelector(selectUser);
  const [isFormChanged, setIsFormChanged] = useState(true);

  if (isLoading) {
    return <Load />;
  }

  const handleFormChange = (changedValues: any) => {
    const changedUser = { ...data, ...changedValues };
    setIsFormChanged(objCompare(data, changedUser));
  };

  const handleEditUser = async (user: UserType) => {
    // console.log(user);
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
          userOwner={userOwner}
          btnText="Сохранить"
          error={error}
          btnDisable={isFormChanged}
          isOwner={userOwner?.id !== data?.id}
          handleFormChange={handleFormChange}
        />
      </Row>
    </Layout>
  );
};
