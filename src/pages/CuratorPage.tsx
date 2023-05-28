import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Curator from "../components/Curator/Curator";

export const CuratorPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Curator />
    </Layout>
  );
};
