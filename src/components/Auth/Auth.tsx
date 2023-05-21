import { useCurrentQuery } from "../../features/api/auth";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();
  // const isLoading = false;

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  return children;
};
