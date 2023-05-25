import { Form, Input, Select } from "antd";
import { UserType } from "../../types/types";

type Props = {
  user?: UserType;
  name: string;
  placeholder: string;
  type?: string;
  selectOptions?: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  isFormChanged?: any;
};

export const CustomInput = ({
  type = "text",
  name,
  placeholder,
  selectOptions,
  disabled = false,
}: Props) => {
  switch (type) {
    case "email":
    case "text":
      return (
        <Form.Item
          name={name}
          rules={[
            {
              required: name === "email" || name === "password" ? true : false,
              message: "Обязательное поле",
            },
          ]}
          shouldUpdate={true}
        >
          <Input
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            size="large"
          />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item
          name={name}
          rules={[{ required: true, message: "Обязательное поле" }]}
          shouldUpdate={true}
        >
          <Select
            options={selectOptions}
            size="large"
            placeholder="Выберите роль пользователя"
            // onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            //   console.log(event)
            // }
          />
        </Form.Item>
      );
    default:
      return <></>;
  }
};
