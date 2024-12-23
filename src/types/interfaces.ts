import { ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}
export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export type API_RESPONSE<T> = {
  message: string;
  data: T;
  statusCode: number;
};
