import { Descriptions, Form } from "antd";
import { useEffect } from "react";
import { useGetUserApplyQuery } from "../../features/api/usersAPI";
import Layout from "../../layouts/Layout";
import Load from "../Load/Load";
import { useParams } from "react-router-dom";
import { changeApplyNames } from "../../utils/changeApplyNames";
import { changeBooleanName } from "../../utils/changeBooleanName";
import { changeStudyGrade } from "../../utils/changeStudyGrade";
import { changeRoleLang } from "../../utils/changeRoleLang";
import { changeCitizenship } from "../../utils/changeCitizenship";
import { changeGenderName } from "../../utils/changeGenderName";
import { changeCityRegionNames } from "../../utils/changeCityRegionNames";
import { changeStudyGradeNames } from "../../utils/changeStudyGradeNames";

export const CandidatApplyInfo = () => {
  const params = useParams<{ id: string }>();
  const { data = [], isLoading } = useGetUserApplyQuery(params?.id || "");

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  if (isLoading) {
    return <Load />;
  }

  const experience = Object.entries(data)
    .filter(([key, value]) => key === "experience")
    .map(([key, value]) => value);

  experience.forEach((item, key) => {
    <Descriptions.Item
      span={2}
      label={key}
      key={key}
    >{`${item[0].experienceName}`}</Descriptions.Item>;
  });

  return (
    <Layout>
      <Descriptions column={2} title="Заявка кандидата" bordered>
        {Object.entries(data)
          .filter(
            ([key, value]) =>
              key !== "experience" &&
              key !== "photo" &&
              key !== "id" &&
              key !== "status"
          )
          .map(([key, value]) => (
            <Descriptions.Item
              span={2}
              label={changeApplyNames(key)}
              key={key}
            >{`${changeCitizenship(
              changeRoleLang(
                changeStudyGrade(
                  changeBooleanName(
                    changeGenderName(
                      changeCityRegionNames(changeStudyGradeNames(value))
                    )
                  )
                )
              )
            )}`}</Descriptions.Item>
          ))}

        {experience[0].map((item: any, key: any) => {
          return (
            <Descriptions.Item
              span={2}
              label={`Практика ${key + 1}`}
              key={key + item.experienceDate}
            >
              <p>Дата: {`${item.experienceDate}`}</p>
              <p>Организация: {`${item.experienceName}`}</p>
              <p>
                Дополнительная информация:
                {`${item.experienceText}`}
              </p>
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Layout>
  );
};
