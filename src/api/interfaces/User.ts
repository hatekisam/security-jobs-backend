import { IUser } from "../models";

export type NewUser = IUser;

export type LoginUser = Pick<IUser, "email" | "password">;

export type PublicUser = Omit<NewUser, "password" | "suspended">;
