import style from "./index.module.css";

export const FullScreen = ({ children }: { children: JSX.Element }) => {
  return <div className={style.fullscreen}>{children}</div>;
};
