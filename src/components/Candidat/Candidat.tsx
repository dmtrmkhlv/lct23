import { Tabs } from "antd";
import { Testing } from "../Testing/Testing";
import { CareerSchool } from "./CareerSchool";
import { CandidatApplyEdit } from "./CandidatApplyEdit";

const Candidat: React.FC = () => {
  // const operations = <Button>Карьерная школа</Button>;
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        // centered={true}
        items={[
          // {
          //   label: "Профиль",
          //   key: "Профиль",
          //   children: <Profile />,
          // },
          {
            label: "Заявка",
            key: "Заявка",
            children: <CandidatApplyEdit />,
          },
          {
            label: "Тестирование",
            key: "Тестирование",
            children: <Testing />,
          },
          {
            label: "Карьерная школа",
            key: "Карьерная школа",
            children: <CareerSchool />,
          },
        ]}
      />
    </div>
  );
};

export default Candidat;
