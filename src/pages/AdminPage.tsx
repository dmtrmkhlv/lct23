import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Admin from "../components/Admin/Admin";

export const AdminPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Admin />
    </Layout>
  );
};
