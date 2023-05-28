import { Spin } from "antd";
import { FullScreen } from "../FullScreen/FullScreen";
import style from "./index.module.css";

export default function Load() {
  return (
    <FullScreen>
      <Spin tip="Загрузка" size="large">
        <div className={style.fullscreen_content} />
      </Spin>
    </FullScreen>
  );
}
