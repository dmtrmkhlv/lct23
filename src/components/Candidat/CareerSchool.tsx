import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Card, Descriptions, Divider, Space } from "antd";
import { useGetUserQuery } from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import Load from "../Load/Load";
import { Typography } from "antd";
import { ExternalLink } from "../ExternalLink/ExternalLink";

const { Text } = Typography;

export const CareerSchool = () => {
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
        title="Карьерная школа Правительства
            Москвы"
        bordered
      >
        <Space direction="vertical">
          <Text>
            Перевод на платформу с онлайн-треком Карьерной школы Правительства
            Москвы и telegram-канал.{" "}
          </Text>
        </Space>
      </Descriptions>
      <Divider orientation="left">Действия</Divider>
      <Space direction="vertical">
        <ExternalLink
          link="#"
          btnText="Перейти в карьерную школу"
          icon="ArrowRightOutlined"
        />
        <ExternalLink
          link="#"
          btnText="Перейти в telegram-канал"
          icon="ArrowRightOutlined"
        />
      </Space>
    </Card>
  );
};
