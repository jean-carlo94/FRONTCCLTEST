import { IUser } from "@/interfaces";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}