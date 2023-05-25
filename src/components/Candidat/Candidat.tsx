import { Tabs } from "antd";
import { Profile } from "../Profile/Profile";
import { Apply } from "../Apply/Apply";
import { ExternalLink } from "../ExternalLink/ExternalLink";

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
            children: <ExternalLink link="/jbjjb" btnText="Перейти" />,
          },
          {
            label: "Карьерная школа",
            key: "Карьерная школа",
            children: "Карьерная школа",
          },
        ]}
      />
    </div>
  );
};

export default Candidat;
