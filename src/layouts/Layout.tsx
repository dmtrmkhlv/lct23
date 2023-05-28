import { Layout as AntLayout } from "antd";
import { BackButton } from "../components/BackButton/BackButton";
import { Header } from "../components/Header/Header";
import { LayoutProps } from "../types/types";
import styles from "./index.module.css";

export default function Layout(props: LayoutProps): JSX.Element {
  const { children, user } = props;
  const role = user?.role || "";
  return (
    <div className={styles.main}>
      <Header role={role} />
      <BackButton />
      <AntLayout.Content style={{ height: "100%" }}>
        {children}
      </AntLayout.Content>
    </div>
  );
}
