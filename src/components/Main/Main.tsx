import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Role } from "../../types/types";
import { AdminPage } from "../../pages/AdminPage";
import { CuratorPage } from "../../pages/CuratorPage";
import { InternPage } from "../../pages/InternPage";
import { MentorPage } from "../../pages/MentorPage";
import { HrPage } from "../../pages/HrPage";

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
