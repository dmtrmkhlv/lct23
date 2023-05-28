import { useCurrentQuery } from "../../features/api/authAPI";
import Load from "../Load/Load";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();
  // const isLoading = true;

  if (isLoading) {
    return <Load />;
  }

  return children;
};
