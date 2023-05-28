import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Mentor from "../components/Mentor/Mentor";

export const MentorPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Mentor />
    </Layout>
  );
};
