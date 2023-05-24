import { Form, Card, Space } from "antd";
import { User } from "../../types/types";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomInput } from "../CustomInput/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  user?: T;
  btnDisable?: boolean;
};

const selectOptions = [
  {
    value: "curator",
    label: "Куратор",
  },
  {
    value: "mentor",
    label: "Наставник",
  },
  {
    value: "hr",
    label: "Кадры",
  },
  {
    value: "admin",
    label: "Администратор",
  },
  {
    value: "candidat",
    label: "Кандидат",
  },
];

export const UserForm = ({
  onFinish,
  title,
  user,
  btnText,
  btnDisable,
  error,
}: Props<User>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-employee" onFinish={onFinish} initialValues={user}>
        <CustomInput
          type="text"
          name="firstName"
          placeholder="Имя"
          disabled={true}
        />
        <CustomInput
          type="text"
          name="lastName"
          placeholder="Фамилия"
          disabled={true}
        />
        <CustomInput
          type="select"
          name="role"
          selectOptions={selectOptions}
          placeholder="Роль"
        />
        <Space direction="vertical" size="large">
          <ErrorMessage message={error} />
          <CustomButton disabled={btnDisable} htmlType="submit">
            {btnText}
          </CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
