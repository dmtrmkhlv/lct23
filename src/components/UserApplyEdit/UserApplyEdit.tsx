import { Card, Form, Row, Space } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import Layout from "../../layouts/Layout";
import { UserType } from "../../types/types";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { objCompare } from "../../utils/objCompare";
import { Paths } from "../../utils/paths";
import Load from "../Load/Load";
import { CustomInput } from "../CustomInput/CustomInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CustomButton } from "../CustomButton/CustomButton";

export const UserApplyEdit = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [editUser] = useEditUserMutation();
  const userOwner = useSelector(selectUser);
  const [isFormChanged, setIsFormChanged] = useState(true);
  const isOwner = userOwner?.id !== data?.id;

  if (isLoading) {
    return <Load />;
  }

  const handleFormChange = (changedValues: any) => {
    const changedUser = { ...data, ...changedValues };
    setIsFormChanged(objCompare(data, changedUser));
  };

  const handleEditUserApply = async (user: UserType) => {
    // console.log(user);
    try {
      const editedUser = {
        ...data,
        ...user,
      };

      await editUser(editedUser).unwrap();

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

  const studyTypeOptions = [
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

  return (
    <Layout>
      <Row align="middle" justify="center">
        {/* <UserForm
          onFinish={handleEditUser}
          title="Редактировать пользователя"
          user={data}
          userOwner={userOwner}
          btnText="Сохранить"
          error={error}
          btnDisable={isFormChanged}
          isOwner={userOwner?.id !== data?.id}
          handleFormChange={handleFormChange}
        /> */}
        <Card
          title="Редактировать заявку на стажировку"
          style={{ width: "30rem" }}
        >
          <Form
            name="add-employee"
            onFinish={handleEditUserApply}
            initialValues={data}
            onValuesChange={handleFormChange}
            layout="vertical"
          >
            <CustomInput
              type="select"
              name="citizenship"
              label="Гражданство"
              selectOptions={citizenshipOptions}
              placeholder="Гражданство"
              user={data}
            />
            <CustomInput
              type="select"
              name="studyType"
              label="Тип обучения"
              selectOptions={studyTypeOptions}
              placeholder="Тип обучения"
              user={data}
            />
            <CustomInput
              type="text"
              name="stadyStart"
              label="Дата начала обучения"
              placeholder="Дата начала обучения"
              user={data}
              disabled={isOwner}
            />
            <CustomInput
              type="text"
              name="stadyStop"
              label="Дата окончания обучения"
              placeholder="Дата окончания обучения"
              user={data}
              disabled={isOwner}
            />
            <CustomInput
              type="select"
              name="experience"
              label="Релевантный опыт"
              selectOptions={experienceOptions}
              placeholder="Релевантный опыт"
              user={data}
            />
            <Space direction="vertical" size="large">
              <ErrorMessage message={error} />
              <CustomButton disabled={isFormChanged} htmlType="submit">
                Сохранить
              </CustomButton>
            </Space>
          </Form>
        </Card>
      </Row>
    </Layout>
  );
};
