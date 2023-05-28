import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import { Paths } from "../utils/paths";
import { Link } from "react-router-dom";

export const NotFoundPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <h1>Страницы не существует</h1>
      <Link to={Paths.main}>На главную</Link>
    </Layout>
  );
};
