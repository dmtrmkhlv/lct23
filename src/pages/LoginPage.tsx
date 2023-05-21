import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import { Login } from "../components/Login/Login";

export const LoginPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Login />
    </Layout>
  );
};
