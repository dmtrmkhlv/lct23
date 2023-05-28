import { ReactNode } from "react";

export type Require = "protected" | "public" | undefined;

export type InputShow = {
  roleParam: boolean;
  emailParam: boolean;
  passwordParam: boolean;
  firstNameParam: boolean;
  lastNameParam: boolean;
  usernameParam: boolean;
  phoneParam: boolean;
};

export type Role =
  | "candidat"
  | "curator"
  | "admin"
  | "intern"
  | "mentor"
  | "hr";

export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export type MainPageProps = {
  user?: (UserType & { token: string }) | null;
};

export interface LayoutProps {
  children: ReactNode;
  user?: (UserType & { token: string }) | null;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserType {
  id: string;
  email: string;
  password: string;
  role: Role;
  firstName: string | "";
  lastName: string | "";
  username: string | "";
  phone: string | "";
}

export interface AuthResponse {
  token: string;
}
