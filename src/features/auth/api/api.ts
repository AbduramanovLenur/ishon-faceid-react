import { endpoints } from "./endpoints";
import type { IAuthFields, IAuthData } from "../model/types";

import type { IApiResponse } from "@shared/types";
import { axiosInstance, clearTokens } from "@shared/api";
import { routes } from "@shared/config";

export const api = {
  login: (values: IAuthFields) => {
    return axiosInstance
      .post<IApiResponse<IAuthData>>(endpoints.LOGIN, values)
      .then((response) => response.data.data);
  },

  logout: () => {
    return axiosInstance
      .post(endpoints.LOGOUT, undefined, { skipAuthRedirect: true })
      .then(() => {
        clearTokens();
  
        window.location.href = routes.AUTH;
      })
  },

  restoreSession: () => {
    return axiosInstance
      .post<IApiResponse<IAuthData>>(endpoints.SESSION, undefined, {
        skipAuthRedirect: true,
      })
      .then((response) => response.data);
  },
}
