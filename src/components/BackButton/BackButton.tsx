import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { CustomButton } from "../CustomButton/CustomButton";
export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {location.pathname !== "/" &&
        !location.pathname.startsWith("/login") &&
        !location.pathname.startsWith("/register") && (
          <CustomButton onClick={handleGoBack}>Назад</CustomButton>
        )}
      <Outlet />
    </div>
  );
};
