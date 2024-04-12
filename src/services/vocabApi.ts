import { IUser } from "../types";

export const login = async ({ email, password }: IUser) => {
  console.log(email, password);
};

export const register = async ({ name, email, password }: IUser) => {
  console.log(name, email, password);
};

export const logout = async () => {
  console.log("logout");
};
