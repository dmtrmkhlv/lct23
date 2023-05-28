import { Space } from "antd";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import { EditOutlined, ArrowRightOutlined } from "@ant-design/icons";

type Props = {
  btnText: string;
  link: string;
  icon?: string;
};

export const ExternalLink = ({ link, btnText, icon }: Props) => {
  switch (icon) {
    case "ArrowRightOutlined":
      return (
        <Space>
          <Link to={`${link}`}>
            <CustomButton
              shape="round"
              type="default"
              icon={<ArrowRightOutlined />}
            >
              {`${btnText}`}
            </CustomButton>
          </Link>
        </Space>
      );

    default:
      return (
        <Space>
          <Link to={`${link}`}>
            <CustomButton shape="round" type="default" icon={<EditOutlined />}>
              {`${btnText}`}
            </CustomButton>
          </Link>
        </Space>
      );
  }
};
