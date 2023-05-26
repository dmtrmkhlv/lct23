import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Card, Descriptions, Divider, Modal, Space } from "antd";
import { useGetUserQuery } from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import Load from "../Load/Load";
import { Typography } from "antd";
import { ExternalLink } from "../ExternalLink/ExternalLink";

const { Text } = Typography;

export const Testing = () => {
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
      <Descriptions title="Результаты теста" bordered>
        <Descriptions.Item label="Тест 1" span={3}>
          <Space direction="vertical">
            <Text type="secondary">58.5 </Text>
          </Space>
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Действия</Divider>
      <ExternalLink link="#" btnText="Пройти тест" icon="ArrowRightOutlined" />
      <ErrorMessage message={error} />
    </Card>
  );
};
