import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IUpdatePasswordCompanyOwnerFields } from "./types";

import type { IApiResponse } from "@shared/types";

export function useResetPasswordCompanyOwner() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return {
    ...useMutation<
      unknown,
      AxiosError<IApiResponse<unknown>>, 
      IUpdatePasswordCompanyOwnerFields
    >({
      mutationFn: api.resetPassword,
      onSuccess: () => {
        message.success(t("resetPassword.updated"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("resetPassword.updateError");
          
        message.error(msg);
      },
    })
  }
}