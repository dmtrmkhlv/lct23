import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Card, Descriptions, Divider, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";

import { CustomButton } from "../CustomButton/CustomButton";
import Load from "../Load/Load";
import { Typography } from "antd";

const { Text } = Typography;

export const Apply = () => {
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
        <Link to={`/apply/edit/${data.id}`}>
          <CustomButton shape="round" type="default" icon={<EditOutlined />}>
            Заполнить заявку
          </CustomButton>
        </Link>
      </Space>
    </Card>
  );
};
