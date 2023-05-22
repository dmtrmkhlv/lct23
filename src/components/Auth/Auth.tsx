import { Spin } from "antd";
import { useCurrentQuery } from "../../features/api/auth";
import { FullScreen } from "../FullScreen/FullScreen";
import style from "./index.module.css";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();
  // const isLoading = false;

  if (isLoading) {
    return (
      <FullScreen>
        <Spin tip="Loading" size="large">
          <div className={style.content} />
        </Spin>
      </FullScreen>
    );
  }

  return children;
};
