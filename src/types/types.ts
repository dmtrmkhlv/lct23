import { ReactNode } from "react";

export type Require = "protected" | "public" | undefined;

export type Role =
  | "norequired"
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
  user?: User;
};

export interface LayoutProps {
  children: ReactNode;
  user?: User;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: number;
}

export interface AuthResponse {
  token: string;
}
