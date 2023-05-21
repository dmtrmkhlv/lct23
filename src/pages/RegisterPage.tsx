import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import { Register } from "../components/Register/Register";

export const RegisterPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Register />
    </Layout>
  );
};
