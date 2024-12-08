import { User } from "@/types/User";
import { axiosParams } from "@/utils/axios";
import axios from "axios";
import { cache } from "react";

export const getUser = cache(async (): Promise<User | null> => {
  try {
    const { data } = await axios.get<
      | User
      | {
          username: null;
        }
    >("/api/auth/current_user/", axiosParams());
    if (!data.username) return null;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
});
