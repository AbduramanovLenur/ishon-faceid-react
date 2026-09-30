import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import type { IUpdateAccessFields } from "./types";
import { api } from "../api/api";

import { employeesKeys, type IEmployeeAdmin } from "@entities/employees";
import type { IApiResponse } from "@shared/types";

export function useGrantAccess() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IEmployeeAdmin>,
      AxiosError<IApiResponse<IEmployeeAdmin>>,
      IUpdateAccessFields
    >({
      mutationFn: api.grantAccess,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.byId(variables.employeeId)
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.excel()
        });

        message.success(t("employees.accessGranted"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("employees.grantAccessError");
          
        message.error(msg);
      },
    })
  }
}