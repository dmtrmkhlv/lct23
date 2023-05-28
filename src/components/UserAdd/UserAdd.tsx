import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { UserType } from "../../types/types";
import { selectUser } from "../../features/auth/authSlice";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useAddUserMutation } from "../../features/api/usersAPI";
import { UserForm } from "../UserForm/UserForm";

export const UserAdd = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddUser = async (data: UserType) => {
    try {
      await addUser(data).unwrap();

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
    <UserForm
      onFinish={handleAddUser}
      title="Добавить пользователя"
      btnText="Добавить"
      error={error}
      isEmail={true}
    />
  );
};
