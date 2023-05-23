import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Role } from "../../types/types";
import { AdminPage } from "../../pages/AdminPage";
import { CuratorPage } from "../../pages/CuratorPage";
import { InternPage } from "../../pages/InternPage";
import { MentorPage } from "../../pages/MentorPage";
import { HrPage } from "../../pages/HrPage";
import { Paths } from "../../utils/paths";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | undefined>("norequired");
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      setRole(user.role);
    } else {
      navigate(Paths.login);
    }
  }, [user, navigate]);

  switch (role) {
    case "admin":
      return <AdminPage user={user} />;
    case "curator":
      return <CuratorPage user={user} />;
    case "intern":
      return <InternPage user={user} />;
    case "mentor":
      return <MentorPage user={user} />;
    case "hr":
      return <HrPage user={user} />;
    default:
      return <Link to={Paths.login} />;
  }
};

export default Main;