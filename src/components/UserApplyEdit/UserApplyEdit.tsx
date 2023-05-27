import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
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
import Layout from "../../layouts/Layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { objCompare } from "../../utils/objCompare";
import { Paths } from "../../utils/paths";
import Load from "../Load/Load";
import { CustomInput } from "../CustomInput/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CustomButton } from "../CustomButton/CustomButton";
import { Typography } from "antd";
import { UserApplyType } from "../../types/UserApplyType";
import dayjs from "dayjs";

const { TextArea } = Input;

const { Text } = Typography;

export const UserApplyEdit = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const userOwner = useSelector(selectUser);
  const { data, isLoading } = useGetUserApplyQuery(userOwner?.id || "");
  const [addUserApply] = useAddUserApplyMutation();
  const [isFormChanged, setIsFormChanged] = useState(true);
  const isOwner = userOwner?.id !== data?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  let formatData = data;
  formatData = Object.assign({}, data, {
    studyEnd: dayjs(data?.studyEnd, "YYYY/MM"),
  });

  if (formatData?.experience) {
    const newExperience = formatData?.experience.map((el) => {
      return Object.assign({}, el, {
        experienceDate: dayjs(el?.experienceDate, "YYYY/MM"),
      });
    });
    formatData = Object.assign({}, formatData, {
      experience: newExperience,
    });
  }

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

  if (isLoading) {
    return <Load />;
  }

  const handleFormChange = (changedValues: any) => {
    const changedUser = { ...formatData, ...changedValues };
    setIsFormChanged(objCompare(formatData, changedUser));
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

  const experienceOptions = [
    {
      value: "yes",
      label: "Да",
    },
    {
      value: "no",
      label: "Нет",
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
    console.log("values", isFormSend);
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Анкета" style={{ width: "30rem" }}>
          <Form
            name="userApply"
            onFinish={handleEditUserApply}
            initialValues={formatData}
            onValuesChange={handleFormChange}
            layout="vertical"
            form={form}
            disabled={formatData.isSend}
          >
            <Divider orientation="left">Основная информация</Divider>
            <CustomInput
              type="text"
              name="firstName"
              placeholder="Имя"
              label="Имя"
              user={formatData}
              disabled={formatData.isSend}
              required={true}
            />
            <CustomInput
              type="text"
              name="lastName"
              placeholder="Фамилия"
              label="Фамилия"
              user={formatData}
              disabled={formatData.isSend}
              required={true}
            />
            <CustomInput
              type="text"
              name="secondName"
              label="Отчество"
              placeholder="Отчество"
              user={formatData}
              disabled={formatData.isSend}
              required={true}
            />
            <CustomInput
              type="select"
              name="gender"
              label="Пол"
              selectOptions={genderOptions}
              placeholder="Пол"
              user={formatData}
              required={true}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="text"
              name="city"
              label="Город проживания"
              placeholder="Город проживания"
              user={formatData}
              required={true}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="select"
              name="cityArea"
              label="Район проживания"
              selectOptions={cityAreaOptions}
              placeholder="Район проживания"
              required={true}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="select"
              name="citizenship"
              label="Гражданство"
              selectOptions={citizenshipOptions}
              placeholder="Гражданство"
              user={formatData}
              required={true}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="select"
              name="study"
              label="Образование"
              selectOptions={studyOptions}
              placeholder="Образование"
              user={formatData}
              required={true}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              user={formatData}
              disabled={formatData.isSend}
              required={true}
            />
            <CustomInput
              type="phone"
              name="phone"
              label="Мобильный телефон"
              placeholder="Мобильный телефон"
              user={formatData}
              disabled={formatData.isSend}
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
              user={formatData}
              onChange={handleStudyChange}
              required={requiredStuduFields}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="text"
              name="studyCity"
              label="Город"
              placeholder="Город"
              user={formatData}
              onChange={handleStudyChange}
              required={requiredStuduFields}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="text"
              name="studyFac"
              label="Факультет"
              placeholder="Факультет"
              user={formatData}
              onChange={handleStudyChange}
              required={requiredStuduFields}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="text"
              name="studySpec"
              label="Специальность"
              placeholder="Специальность"
              user={formatData}
              onChange={handleStudyChange}
              required={requiredStuduFields}
              disabled={formatData.isSend}
            />
            <Text code>
              Если ты еще учишься, напиши предполагаемый год выпуска
            </Text>
            <CustomInput
              type="date"
              name="studyEnd"
              label="Год окончания"
              placeholder="Год окончания"
              user={formatData}
              // picker={"year"}
              onChange={handleStudyChange}
              required={requiredStuduFields}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="select"
              name="studyGrade"
              label="Уровень образования"
              selectOptions={studyGradeOptions}
              placeholder="Уровень образования"
              user={formatData}
              onChange={handleStudyChange}
              required={requiredStuduFields}
              disabled={formatData.isSend}
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
                    Если где-то у тебя существенно менялся уровень
                    ответственности и обязанностей, отметь эту позицию отдельно.
                  </p>
                  <Text mark>
                    Внимание: для участия в отборе нужно обязательно заполнить
                    это поле.
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
                          rules={[{ required: true, message: "Укажите дату" }]}
                        >
                          <DatePicker
                            size="large"
                            format="YYYY/MM"
                            // picker="month"
                          />
                        </Form.Item>
                      </div>
                      {!formatData?.isSend && (
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
                          // onChange={onChange}
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
              user={formatData}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="text"
              name="internAbout"
              label="Откуда ты узнал о стажировке?"
              placeholder="Откуда ты узнал о стажировке?"
              user={formatData}
              disabled={formatData.isSend}
            />
            <CustomInput
              type="text"
              name="internSchedule"
              label="График работы"
              placeholder="График работы"
              user={formatData}
              disabled={formatData.isSend}
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
                <a href="#">согласия</a>
              </Checkbox>
            </Form.Item>
            {!formatData.isSend && (
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
      </Row>
    </Layout>
  );
};
