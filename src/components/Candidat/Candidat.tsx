import { Tabs } from "antd";
import { Profile } from "../Profile/Profile";
import { Apply } from "../Apply/Apply";
import { ExternalLink } from "../ExternalLink/ExternalLink";
import { Testing } from "../Testing/Testing";
import { CareerSchool } from "../CareerSchool/CareerSchool";

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
          {
            label: "Профиль",
            key: "Профиль",
            children: <Profile />,
          },
          {
            label: "Заявка",
            key: "Заявка",
            children: <Apply />,
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
