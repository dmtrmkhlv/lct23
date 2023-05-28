import { Button, Form, InputNumber, Select, Switch } from "antd";
import { IFilterFormDataAutoSearch } from "../../types/IFilterFormDataAutoSearch";
import { UserApplyType } from "../../types/UserApplyType";

const { Option } = Select;

type Props = {
  onOk: () => void;
  getFilterData: (
    filter: IFilterFormDataAutoSearch
  ) => UserApplyType[] | undefined;
};

export default function AutoSearchForm({ onOk, getFilterData }: Props) {
  const [form] = Form.useForm();

  const handleSubmit = (values: IFilterFormDataAutoSearch) => {
    onOk();
    getFilterData(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Гражданство" name="citizenship" initialValue="ru">
        <Select>
          <Option value="ru">РФ</Option>
          <Option value="notru">Не РФ</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Минимальный возраст" name="minAge" initialValue={18}>
        <InputNumber min={18} max={99} />
      </Form.Item>
      <Form.Item label="Максимальный возраст" name="maxAge" initialValue={35}>
        <InputNumber min={18} max={99} />
      </Form.Item>
      <Form.Item
        label="Минимальный курс обучения"
        name="minCourse"
        initialValue={1}
      >
        <Select>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Тип обучения" name="studyGrade" initialValue="mag">
        <Select>
          <Option value="mag">Магистратура</Option>
          <Option value="bak">Бакалавриат</Option>
          <Option value="spec">Специалитет</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Наличие опыта работы и/или общественной/проектной деятельности/волонтерства (3 и более мест)"
        name="hasExperience"
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Получить данные
        </Button>
      </Form.Item>
    </Form>
  );
}
