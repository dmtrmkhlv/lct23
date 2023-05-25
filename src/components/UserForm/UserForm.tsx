import { Form, Card, Space } from "antd";
import { User } from "../../types/types";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomInput } from "../CustomInput/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props<T> = {
  onFinish: (values: T) => void;
  handleFormChange?: any;
  btnText: string;
  title: string;
  error?: string;
  user?: T;
  isOwner?: boolean;
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
  {
    value: "intern",
    label: "Стажер",
  },
];

export const UserForm = ({
  onFinish,
  title,
  user,
  isOwner,
  btnText,
  btnDisable,
  error,
  handleFormChange,
}: Props<User>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form
        name="add-employee"
        onFinish={onFinish}
        initialValues={user}
        onValuesChange={handleFormChange}
      >
        <CustomInput
          type="text"
          name="firstName"
          placeholder="Имя"
          user={user}
          disabled={isOwner}
        />
        <CustomInput
          type="text"
          name="lastName"
          placeholder="Фамилия"
          user={user}
          disabled={isOwner}
        />
        <CustomInput
          type="select"
          name="role"
          selectOptions={selectOptions}
          placeholder="Роль"
          user={user}
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
