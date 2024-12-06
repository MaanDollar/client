import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const axiosParams = (): AxiosRequestConfig => {
  const cookie = cookies();
  return {
    headers: {
      cookie: cookie.toString(),
    },
  };
};
