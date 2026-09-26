import { useQuery } from "@tanstack/react-query";

import { userKeys, USER_ID_KEY } from "./keys";
import { api } from "../api/api";
import { setStorageItem } from "@shared/lib";

export function useUser() {
  return useQuery({
    queryKey: userKeys.user,
    queryFn: ({ signal }) =>
      api.me(signal).then((user) => {
        setStorageItem(USER_ID_KEY, user.id);

        return user;
      }),
  })
}