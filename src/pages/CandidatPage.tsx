import Layout from "../layouts/Layout";
import { FC } from "react";
import { MainPageProps } from "../types/types";
import Candidat from "../components/Candidat/Candidat";

export const CandidatPage: FC<MainPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <Candidat />
    </Layout>
  );
};
