import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Main from "../components/Main/Main";

export const MainPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Main />
    </Layout>
  );
};
