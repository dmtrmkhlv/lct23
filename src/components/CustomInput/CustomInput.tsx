import React from "react";
import { Form, Input, Select, Space } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
  selectOptions?: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
};

export const CustomInput = ({
  type = "text",
  name,
  placeholder,
  selectOptions,
  defaultValue,
  disabled = false,
}: Props) => {
  switch (type) {
    case "text":
      return (
        <Form.Item
          name={name}
          rules={[{ required: true, message: "Обязательное поле" }]}
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
            defaultValue={defaultValue}
            options={selectOptions}
            size="large"
          />
        </Form.Item>
      );
    default:
      return <></>;
  }
};
