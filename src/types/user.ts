export type ROLE = "ADMIN" | "USER";
export interface UserData {
  id: string;
  email: string;
  name: string;
  role: ROLE;
  image: string | null;
}
