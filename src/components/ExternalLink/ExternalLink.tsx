import { Space } from "antd";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import { EditOutlined } from "@ant-design/icons";

type Props = {
  btnText: string;
  link: string;
};

export const ExternalLink = ({ link, btnText }: Props) => {
  return (
    <Space>
      <Link to={`${link}`}>
        <CustomButton shape="round" type="default" icon={<EditOutlined />}>
          {`${btnText}`}
        </CustomButton>
      </Link>
    </Space>
  );
};
