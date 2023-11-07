import { IAccount } from "../models";
import { IUser } from "../models";

export type NewAccount = IAccount;

export type LoginAccount = Pick<IAccount, "email" | "password">;

export type PublicAccount = Omit<IAccount, "password" | "suspended">;
