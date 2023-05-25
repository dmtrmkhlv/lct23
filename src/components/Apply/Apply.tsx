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
import { Typography } from "antd";

const { Text } = Typography;

export const Apply = () => {
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetUserQuery(user?.id || "");

  if (isLoading) {
    return <Load />;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  return (
    <Card>
      <Descriptions
        title="Отправка заявки на участие в отборе на стажировку"
        bordered
      >
        {/* Отправка заявки на участие в отборе на стажировку Просмотр статуса заявки на стажировку: - отказ в прохождении на стажировку, - прохождение на следующий этап отбора, - прохождение на стажировку */}

        <Descriptions.Item label="Статус заявки" span={3}>
          <Space direction="vertical">
            <Text type="secondary">заявка не отправлена</Text>
            <Text type="warning">заявка на рассмотрении</Text>
            <Text type="success">заявка одобрена</Text>
            <Text type="danger">заявка отклонена</Text>
          </Space>
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Действия</Divider>
      <Space>
        <Link to={`/user/edit/${data.id}`}>
          <CustomButton shape="round" type="default" icon={<EditOutlined />}>
            Заполнить заявку
          </CustomButton>
        </Link>
      </Space>
      <ErrorMessage message={error} />
    </Card>
  );
};
