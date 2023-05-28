import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Badge, Card, Descriptions, Divider, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetUserApplyQuery } from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";

import { CustomButton } from "../CustomButton/CustomButton";
import Load from "../Load/Load";
import { Typography } from "antd";

const { Text } = Typography;

export const Apply = () => {
  // if (!data) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Card>
      <Descriptions
        title="Отправка заявки на участие в отборе на стажировку"
        bordered
      >
        <Descriptions.Item label="Статус заявки">
          <Space direction="vertical">
            <Badge status="default" text="заявка не отправлена" />
            <Badge status="processing" text="заявка на рассмотрении" />
            <Badge status="success" text="заявка одобрена" />
            <Badge status="error" text="заявка отклонена" />
          </Space>
        </Descriptions.Item>
      </Descriptions>
      <Card style={{}}>
        <Space direction="vertical">
          <Text>
            <p>
              {" "}
              Прямо сейчас ты делаешь свой первый шаг на пути к карьере в
              Правительстве Москвы — участвуешь в отборе на стажировку, которая
              пройдет с 1 августа 2023 года по 31 января 2024 года. Мы ждем твою
              заявку до 17 апреля.
            </p>
            <p>
              {" "}
              Стать стажерами Правительства Москвы могут студенты бакалавриата
              или специалитета, обучающиеся на последнем курсе, магистранты и
              выпускники вузов, получившие первое образование с 2016 по 2022
              год.{" "}
            </p>
            <p>
              Чтобы подать заявку, заполни анкету ниже. Внимательно проверь,
              правильно ли введены все данные и особенно адрес электронной почты
              — на него в течение двух недель после подачи заявки придет
              информация о твоих следующих шагах.{" "}
            </p>
            <p>
              {" "}
              Анкета — это начало нашего знакомства. Мы хотим узнать о твоем
              образовании, опыте работы, если он есть, увлечениях или внеучебной
              деятельности, о навыках, которые ты приобрел во время учебы.
              Обязательно заполни анкету полностью перед подачей заявки — мы не
              сможем увидеть изменения, внесенные после отклика.
            </p>
            <p> Желаем удачи!</p>
          </Text>
        </Space>
      </Card>
      <Divider orientation="left">Действия</Divider>
      <Space>
        <Link to={`/apply/edit`}>
          <CustomButton shape="round" type="default" icon={<EditOutlined />}>
            Заполнить анкету
          </CustomButton>
        </Link>
      </Space>
    </Card>
  );
};
