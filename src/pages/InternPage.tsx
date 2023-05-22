import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Intern from "../components/Intern/Intern";

export const InternPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Intern />
    </Layout>
  );
};
