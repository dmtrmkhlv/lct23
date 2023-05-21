// import { Employee } from "@prisma/client";
import { Form, Card, Space } from "antd";
import { CustomInput } from "../CustomInput/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CustomButton } from "../CustomButton/CustomButton";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  title,
  employee,
  btnText,
  error,
}: Props<any>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-employee" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Имя" />
        <CustomInput name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput name="address" placeholder="Адрес" />
        <Space direction="vertical" size="large">
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
