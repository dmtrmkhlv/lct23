import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Role } from "../../types/types";
import Admin from "../Admin/Admin";
import Curator from "../Curator/Curator";
import Intern from "../Intern/Intern";
import Mentor from "../Mentor/Mentor";
import Hr from "../Hr/Hr";

const Main: React.FC = () => {
  const [role, setRole] = useState<Role | undefined>("norequired");
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  switch (role) {
    case "admin":
      return <Admin />;
    case "curator":
      return <Curator />;
    case "intern":
      return <Intern />;
    case "mentor":
      return <Mentor />;
    case "hr":
      return <Hr />;
    default:
      return (
        <>
          <section className="features">
            <div className="container">
              <h2>norequired</h2>
            </div>
          </section>
        </>
      );
  }
};

export default Main;
