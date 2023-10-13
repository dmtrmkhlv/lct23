import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Descriptions, Divider, Modal, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useGetUserQuery,
  useRemoveUserMutation,
} from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import Layout from "../../layouts/Layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../utils/paths";
import { CustomButton } from "../CustomButton/CustomButton";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { changeRoleLang } from "../../utils/changeRoleLang";
import Load from "../Load/Load";

export const User = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [removeUser] = useRemoveUserMutation();
  const user = useSelector(selectUser);

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
    <Layout>
      <Descriptions column={3} title="Информация о пользователе" bordered>
        <Descriptions.Item
          span={3}
          label="Имя"
        >{`${data.firstName}`}</Descriptions.Item>

        <Descriptions.Item
          span={3}
          label="Фамилия"
        >{`${data.lastName}`}</Descriptions.Item>

        <Descriptions.Item span={3} label="Роль">{`${changeRoleLang(
          data.role
        )}`}</Descriptions.Item>
      </Descriptions>
      {(user?.id === data.id || user?.role === "admin") && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/user/edit/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника?
      </Modal>
    </Layout>
  );
};
