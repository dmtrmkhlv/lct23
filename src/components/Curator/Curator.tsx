import { Tabs } from "antd";
import { Testing } from "../Testing/Testing";
import CuratorApply from "./CuratorApply";

export default function Curator() {
  // const operations = <Button>Карьерная школа</Button>;
  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      size={"large"}
      items={[
        {
          label: "Заявки на стажировку",
          key: "Заявки на стажировку",
          children: <CuratorApply />,
        },
        {
          label: "Потребность в стажерах",
          key: "Потребность в стажера",
          children: <Testing />,
        },
        {
          label: "Статистика",
          key: "Статистика",
          children: <Testing />,
        },
        {
          label: "Школа наставников",
          key: "Школа наставников",
          children: <Testing />,
        },
      ]}
    />
  );
}
