import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Divider, Modal, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useGetUserQuery,
  useRemoveUserMutation,
} from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../utils/paths";
import { CustomButton } from "../CustomButton/CustomButton";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { changeRoleLang } from "../../utils/changeRoleLang";
import Load from "../Load/Load";

export const Profile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetUserQuery(user?.id || "");
  const [removeUser] = useRemoveUserMutation();

  if (isLoading) {
    return <Load />;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeUser(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
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
    <Card>
      <Descriptions title="Основная информация" bordered>
        <Descriptions.Item label="Имя">{`${data.firstName}`}</Descriptions.Item>

        <Descriptions.Item label="Фамилия">{`${data.lastName}`}</Descriptions.Item>

        <Descriptions.Item label="Статус">{`${changeRoleLang(
          data.role
        )}`}</Descriptions.Item>

        <Descriptions.Item label="Email">{`${data.email}`}</Descriptions.Item>
        <Descriptions.Item label="Телефон">{`${data.phone}`}</Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Действия</Divider>
      <Space>
        <Link to={`/user/edit/${data.id}`}>
          <CustomButton shape="round" type="default" icon={<EditOutlined />}>
            Редактировать
          </CustomButton>
        </Link>
        {/* <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton> */}
      </Space>
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить профиль?
      </Modal>
    </Card>
  );
};
