import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IApiResponse, IFile } from "../types";

export function useUploadFile() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return {
    ...useMutation<
      IApiResponse<IFile>,
      AxiosError<IApiResponse<IFile>>,
      FormData
    >({
      mutationFn: api.upload,
      onSuccess: (response) => {
        if (response.success) {
          message.success(t("common.fileUploaded"));
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("common.fileUploadError");

        message.error(msg);
      },
    }),
  };
}
