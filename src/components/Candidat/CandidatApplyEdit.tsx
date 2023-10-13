import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  UploadProps,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  useGetUserApplyQuery,
  useAddUserApplyMutation,
} from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { objCompare } from "../../utils/objCompare";
import { Paths } from "../../utils/paths";
import Load from "../Load/Load";
import { CustomInput } from "../CustomInput/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CustomButton } from "../CustomButton/CustomButton";
import { Typography } from "antd";
import { UserApplyType } from "../../types/UserApplyType";

const { TextArea } = Input;

const { Text } = Typography;

export const CandidatApplyEdit = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const userOwner = useSelector(selectUser);
  const { data, isLoading } = useGetUserApplyQuery(userOwner?.id || "");
  const [addUserApply] = useAddUserApplyMutation();
  const [isFormChanged, setIsFormChanged] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [requiredStuduFields, setRequiredStuduFields] = useState(false);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const handleStudyChange = useCallback(
    (data: any | null) => {
      if (
        (form.getFieldValue("studyName") !== "" &&
          form.getFieldValue("studyName") !== undefined) ||
        (form.getFieldValue("studyCity") !== "" &&
          form.getFieldValue("studyCity") !== undefined) ||
        (form.getFieldValue("studyFac") !== "" &&
          form.getFieldValue("studyFac") !== undefined) ||
        (form.getFieldValue("studySpec") !== "" &&
          form.getFieldValue("studySpec") !== undefined) ||
        (form.getFieldValue("studyEnd") !== "" &&
          form.getFieldValue("studyEnd") !== undefined) ||
        (form.getFieldValue("studyGrade") !== "" &&
          form.getFieldValue("studyGrade") !== undefined)
      ) {
        setRequiredStuduFields(true);
      } else {
        setRequiredStuduFields(false);
      }
    },
    [form]
  );

  useEffect(() => {
    if (userOwner?.id !== data?.id) {
      navigate(Paths.main);
    }
  }, [data?.id, navigate, userOwner?.id]);

  useEffect(() => {
    handleStudyChange(form);
  }, [form, handleStudyChange]);

  const handleFormChange = (changedValues: any) => {
    const changedUser = { ...data, ...changedValues };
    setIsFormChanged(objCompare(data, changedUser));
  };

  const handleEditUserApply = async (user: UserApplyType) => {
    console.log(user);
    try {
      const editedUserApply = {
        ...data,
        ...user,
      };

      await addUserApply(editedUserApply).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  const citizenshipOptions = [
    {
      value: "ru",
      label: "РФ",
    },
    {
      value: "notru",
      label: "Не РФ",
    },
  ];

  const studyGradeOptions = [
    {
      value: "mag",
      label: "Магистрат",
    },
    {
      value: "bak",
      label: "Бакалавриат",
    },
    {
      value: "spec",
      label: "Спецалитет",
    },
  ];

  const genderOptions = [
    {
      value: "man",
      label: "Мужской",
    },
    {
      value: "woman",
      label: "Женский",
    },
  ];
  const cityAreaOptions = [
    {
      value: "CAO",
      label: "ЦАО",
    },
    {
      value: "SAO",
      label: "САО",
    },
    {
      value: "SVAO",
      label: "СВАО",
    },
    {
      value: "UVAO",
      label: "ЮВАО",
    },
    {
      value: "UAO",
      label: "ЮАО",
    },
    {
      value: "UZAO",
      label: "ЮЗАО",
    },
    {
      value: "ZAO",
      label: "ЗАО",
    },
    {
      value: "SZAO",
      label: "СЗАО",
    },
    {
      value: "ZelAO",
      label: "ЗелАО",
    },
    {
      value: "TiNAO",
      label: "ТиНАО",
    },
  ];

  const studyOptions = [
    {
      value: "SOO",
      label: "Среднее (полное) общее образование",
    },
    {
      value: "NPO",
      label: "Начальное профессиональное образование",
    },
    {
      value: "SPO",
      label: "Среднее профессиональное образование",
    },
    {
      value: "NVO",
      label: "Неполное высшее образование",
    },
    {
      value: "VO",
      label: "Высшее образование",
    },
  ];

  const props: UploadProps = {
    // name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // headers: {
    //   authorization: "authorization-text",
    // },
    // onChange(info: any) {
    //   if (info.file.status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === "done") {
    //     console.log(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     console.log(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const sendApply = () => {
    const values = form.getFieldsValue();
    const isFormSend = { ...values, isSend: true };
    handleEditUserApply(isFormSend);
    console.log("values", isFormSend);
  };

  if (isLoading) {
    return <Load />;
  }

  return (
    <>
      <Card>
        <Descriptions
          title="Отправка заявки на участие в отборе на стажировку"
          bordered
        >
          <Descriptions.Item label="Статус заявки">
            <Space direction="vertical">
              {!data?.isSend && (
                <Badge status="default" text="заявка не отправлена" />
              )}
              {data?.isSend && (
                <Badge status="processing" text="заявка на рассмотрении" />
              )}
            </Space>
          </Descriptions.Item>
        </Descriptions>
        <Card style={{}}>
          <Space direction="vertical">
            <Text>
              <p>
                {" "}
                Прямо сейчас ты делаешь свой первый шаг на пути к карьере в
                Правительстве Москвы — участвуешь в отборе на стажировку,
                которая пройдет с 1 августа 2023 года по 31 января 2024 года. Мы
                ждем твою заявку до 17 апреля.
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
                правильно ли введены все данные и особенно адрес электронной
                почты — на него в течение двух недель после подачи заявки придет
                информация о твоих следующих шагах.{" "}
              </p>
              <p>
                {" "}
                Анкета — это начало нашего знакомства. Мы хотим узнать о твоем
                образовании, опыте работы, если он есть, увлечениях или
                внеучебной деятельности, о навыках, которые ты приобрел во время
                учебы. Обязательно заполни анкету полностью перед подачей заявки
                — мы не сможем увидеть изменения, внесенные после отклика.
              </p>
              <p> Желаем удачи!</p>
            </Text>
          </Space>
        </Card>
      </Card>
      <Card title="Анкета" style={{ marginTop: "20px" }}>
        <Form
          name="userApply"
          onFinish={handleEditUserApply}
          initialValues={data}
          onValuesChange={handleFormChange}
          layout="vertical"
          form={form}
          disabled={data?.isSend}
        >
          <Divider orientation="left">Основная информация</Divider>
          <CustomInput
            type="text"
            name="firstName"
            placeholder="Имя"
            label="Имя"
            user={data}
            disabled={data?.isSend}
            required={true}
          />
          <CustomInput
            type="text"
            name="lastName"
            placeholder="Фамилия"
            label="Фамилия"
            user={data}
            disabled={data?.isSend}
            required={true}
          />
          <CustomInput
            type="text"
            name="secondName"
            label="Отчество"
            placeholder="Отчество"
            user={data}
            disabled={data?.isSend}
            required={true}
          />
          <CustomInput
            type="select"
            name="gender"
            label="Пол"
            selectOptions={genderOptions}
            placeholder="Пол"
            user={data}
            required={true}
            disabled={data?.isSend}
          />
          <CustomInput
            type="number"
            name="age"
            label="Возраст"
            placeholder="Возраст"
            user={data}
            disabled={data?.isSend}
            required={true}
          />
          <CustomInput
            type="text"
            name="city"
            label="Город проживания"
            placeholder="Город проживания"
            user={data}
            required={true}
            disabled={data?.isSend}
          />
          <CustomInput
            type="select"
            name="cityArea"
            label="Район проживания"
            selectOptions={cityAreaOptions}
            placeholder="Район проживания"
            required={true}
            disabled={data?.isSend}
          />
          <CustomInput
            type="select"
            name="citizenship"
            label="Гражданство"
            selectOptions={citizenshipOptions}
            placeholder="Гражданство"
            user={data}
            required={true}
            disabled={data?.isSend}
          />
          <CustomInput
            type="select"
            name="study"
            label="Образование"
            selectOptions={studyOptions}
            placeholder="Образование"
            user={data}
            required={true}
            disabled={data?.isSend}
          />
          <CustomInput
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            user={data}
            disabled={data?.isSend}
            required={true}
          />
          <CustomInput
            type="phone"
            name="phone"
            label="Мобильный телефон"
            placeholder="Мобильный телефон"
            user={data}
            disabled={data?.isSend}
            required={true}
          />
          <Divider orientation="left">Образование</Divider>
          <Card style={{}}>
            <Space direction="vertical">
              <Text>
                Если ты еще студент, обязательно укажи место учебы и уровень
                получаемого образования: бакалавриат/специалитет/магистратура.
              </Text>
            </Space>
          </Card>
          <CustomInput
            type="text"
            name="studyName"
            label="Учебное заведение"
            placeholder="Учебное заведение"
            user={data}
            onChange={handleStudyChange}
            required={requiredStuduFields}
            disabled={data?.isSend}
          />
          <CustomInput
            type="text"
            name="studyCity"
            label="Город"
            placeholder="Город"
            user={data}
            onChange={handleStudyChange}
            required={requiredStuduFields}
            disabled={data?.isSend}
          />
          <CustomInput
            type="text"
            name="studyFac"
            label="Факультет"
            placeholder="Факультет"
            user={data}
            onChange={handleStudyChange}
            required={requiredStuduFields}
            disabled={data?.isSend}
          />
          <CustomInput
            type="text"
            name="studySpec"
            label="Специальность"
            placeholder="Специальность"
            user={data}
            onChange={handleStudyChange}
            required={requiredStuduFields}
            disabled={data?.isSend}
          />
          <Text code>
            Если ты еще учишься, напиши предполагаемый год выпуска
          </Text>
          <CustomInput
            type="number"
            name="studyEnd"
            label="Год окончания"
            placeholder="Год окончания"
            user={data}
            onChange={handleStudyChange}
            required={requiredStuduFields}
            disabled={data?.isSend}
          />
          <CustomInput
            type="select"
            name="studyGrade"
            label="Уровень образования"
            selectOptions={studyGradeOptions}
            placeholder="Уровень образования"
            user={data}
            onChange={handleStudyChange}
            required={requiredStuduFields}
            disabled={data?.isSend}
          />

          <Divider orientation="left">
            Опыт работы (практик, стажировок)
          </Divider>
          <Card style={{}}>
            <Space direction="vertical">
              <Text>
                <p>
                  {" "}
                  Укажи последние три места работы, практики, стажировки или
                  проектной и общественной деятельности, начиная с последнего.
                  Если где-то у тебя существенно менялся уровень ответственности
                  и обязанностей, отметь эту позицию отдельно.
                </p>
                <Text mark>
                  Внимание: для участия в отборе нужно обязательно заполнить это
                  поле.
                </Text>
              </Text>
            </Space>
          </Card>
          <Divider orientation="left"></Divider>
          <Form.List name="experience">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "experienceName"]}
                        label="Наименование организации"
                        rules={[
                          {
                            required: true,
                            message: "Напишите название организации",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Наименование организации"
                          type="text"
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "experienceDate"]}
                        label="Дата"
                        rules={[
                          { required: true, message: "Укажите дату" },
                          {
                            pattern: /^\d{4}$/,
                            message: "Формат года не правильный",
                          },
                        ]}
                      >
                        <Input placeholder="Год" type="number" size="large" />
                      </Form.Item>
                    </div>
                    {!data?.isSend && (
                      <MinusCircleOutlined
                        style={{
                          color: "#ff0f43",
                        }}
                        onClick={() => remove(name)}
                      />
                    )}

                    <Form.Item
                      {...restField}
                      name={[name, "experienceText"]}
                      label="Дополнительная информация"
                      style={{
                        width: "100%",
                      }}
                    >
                      <TextArea
                        showCount
                        size="large"
                        maxLength={100}
                        style={{
                          height: 60,
                          resize: "none",
                          flexGrow: 1,
                          marginBottom: "20px",
                        }}
                        placeholder="Дополнительная информация"
                      />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить организацию
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Divider orientation="left">Дополнительная информация</Divider>
          <CustomInput
            type="text"
            name="internDirection"
            label="Направление стажировки"
            placeholder="Направление стажировки"
            user={data}
            disabled={data?.isSend}
          />
          <CustomInput
            type="text"
            name="internAbout"
            label="Откуда ты узнал о стажировке?"
            placeholder="Откуда ты узнал о стажировке?"
            user={data}
            disabled={data?.isSend}
          />
          <CustomInput
            type="text"
            name="internSchedule"
            label="График работы"
            placeholder="График работы"
            user={data}
            disabled={data?.isSend}
          />
          <Form.Item label="Загрузить фото" name="photo">
            <Upload fileList={[]} {...props}>
              <Button icon={<UploadOutlined />}>Выбрать</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="vk" label="Профиль в соцсети «ВКонтакте»">
            <Input addonBefore="vk.com/" type="text" size="large" />
          </Form.Item>
          <Form.Item name="telegram" label="Профиль в Telegram">
            <Input addonBefore="t.me/" type="text" size="large" />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Обязательное условие")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox
              style={{
                width: "100%",
                margin: "0",
              }}
            >
              Нажимая кнопку «Подать заявку», даю согласие на обработку
              персональных данных, указанных в анкете (включая контактную
              информацию и фотографии), в рамках проекта «Карьерный портал
              Правительства Москвы» в соответствии с текстом{" "}
              <a href="./">согласия</a>
            </Checkbox>
          </Form.Item>
          {!data?.isSend && (
            <Form.Item
              wrapperCol={{ offset: 2, span: 16 }}
              style={{ display: "flex" }}
            >
              <ErrorMessage message={error} />
              <CustomButton disabled={isFormChanged} htmlType="submit">
                Сохранить
              </CustomButton>

              <CustomButton
                disabled={!isFormChanged}
                type="primary"
                onClick={showModal}
              >
                Подать заявку
              </CustomButton>
            </Form.Item>
          )}
        </Form>
        <Modal
          title="Подтвердите отправку заявки"
          open={isModalOpen}
          onOk={sendApply}
          onCancel={hideModal}
          okText="Подтвердить"
          cancelText="Отменить"
        >
          Вы действительно хотите отправить заявку?
        </Modal>
      </Card>
    </>
  );
};
