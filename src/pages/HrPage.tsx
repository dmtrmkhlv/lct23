import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Hr from "../components/Hr/Hr";

export const HrPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Hr />
    </Layout>
  );
};
