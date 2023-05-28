import { DatePicker, Form, Input, Select } from "antd";
import { UserType } from "../../types/types";
import { UserApplyType } from "../../types/UserApplyType";

type Props = {
  user?: UserType | UserApplyType;
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  selectOptions?: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  isFormChanged?: any;
  required?: boolean;
  picker?: "year" | "date" | "time" | "month" | "week" | "quarter" | undefined;
  onChange?: (data: any | null) => void;
};

export const CustomInput = ({
  type = "text",
  name,
  placeholder,
  selectOptions,
  label,
  required = false,
  disabled = false,
  picker = "year",
  onChange,
}: Props) => {
  switch (type) {
    case "email":
    case "text":
    case "number":
      if (name === "studyEnd") {
        return (
          <Form.Item
            name={name}
            label={label}
            required={required}
            rules={[
              {
                required: required,
                message: "Обязательное поле",
              },
              {
                pattern: /^\d{4}$/,
                message: "Формат года не правильный",
              },
            ]}
            shouldUpdate={true}
          >
            <Input
              disabled={disabled}
              placeholder={placeholder}
              type={type}
              size="large"
              onChange={onChange}
            />
          </Form.Item>
        );
      }
      return (
        <Form.Item
          name={name}
          label={label}
          required={required}
          rules={[
            {
              required: required,
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
            onChange={onChange}
          />
        </Form.Item>
      );
    case "phone":
      return (
        <Form.Item
          name={name}
          label={label}
          required={required}
          rules={[
            { required: required, message: "Обязательное поле" },
            // { pattern: /^\d{10}$/, message: "Формат номера не правильный" },
          ]}
          shouldUpdate={true}
        >
          <Input
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            size="large"
            onChange={onChange}
          />
        </Form.Item>
      );
    case "date":
      return (
        <Form.Item
          name={name}
          label={label}
          required={required}
          rules={[
            { required: required, message: "Обязательное поле" },
            // { pattern: /^\d{10}$/, message: "Формат номера не правильный" },
          ]}
          shouldUpdate={true}
        >
          <DatePicker picker={picker} onChange={onChange} />
          {/* <Input
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            size="large"
          /> */}
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item
          name={name}
          label={label}
          required={required}
          rules={[{ required: required, message: "Обязательное поле" }]}
          shouldUpdate={true}
        >
          <Select
            options={selectOptions}
            size="large"
            // placeholder="Выберите роль пользователя"
            placeholder={placeholder}
            onChange={onChange}
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
