import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IAuthFields, IAuthData } from "./types";

import { USER_ID_KEY, userKeys } from "@entities/user";
import { clearTokens, setTokens } from "@shared/api";
import { routes } from "@shared/config";
import { removeStorageItem } from "@shared/lib";
import type { IApiResponse } from "@shared/types";

export function useLogin() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IAuthData,
      AxiosError<IApiResponse<IAuthData>>,
      IAuthFields
    >({
      mutationFn: api.login,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: userKeys.user,
        });

        setTokens({ accessToken: data.accessToken });

        message.success(t("authMutations.welcome", { name: data.user.fullName }));

        navigate(routes.HOME);
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("authMutations.loginError");

        message.error(msg);
      },
    }),
  };
}

export function useLogout() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return {
    ...useMutation<void, AxiosError, void>({
      mutationFn: api.logout,
      onSuccess: () => {
        clearTokens();
        removeStorageItem(USER_ID_KEY);
        queryClient.removeQueries();

        navigate(routes.AUTH, { replace: true });

        message.success(t("authMutations.loggedOut"));
      },
      onError: () => {
        const msg = t("authMutations.logoutError");

        message.error(msg);
      },
    }),
  };
}

export function useSessionRestore() {
  return {
    ...useMutation<
      IApiResponse<IAuthData>,
      AxiosError<IApiResponse<IAuthData>>,
      void
    >({
      mutationFn: () => api.restoreSession(),
      onSuccess: (response) => {
        if (response.success) {
          setTokens({ accessToken: response.data.accessToken });
        }
      },
    })
  };
}
