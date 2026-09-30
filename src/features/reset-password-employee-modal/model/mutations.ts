import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IUpdatePasswordEmployeeFields } from "./types";

import type { IApiResponse } from "@shared/types";

export function useResetPasswordEmployee() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return {
    ...useMutation<
      unknown,
      AxiosError<IApiResponse<unknown>>, 
      IUpdatePasswordEmployeeFields
    >({
      mutationFn: api.resetPassword,
      onSuccess: () => {
        message.success(t("employees.passwordReset"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("employees.passwordResetError");
          
        message.error(msg);
      },
    })
  }
}