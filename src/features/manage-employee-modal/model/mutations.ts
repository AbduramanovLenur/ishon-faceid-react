import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { ICreateEmployeeFields, IUpdateEmployeeFields } from "./types";

import { employeesKeys, type IEmployee } from "@entities/employees";
import { todaysPresenceKeys } from "@entities/todays-presence";
import type { IApiResponse } from "@shared/types";

export function useCreateEmployee() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IEmployee>, 
      AxiosError<IApiResponse<IEmployee>>, 
      ICreateEmployeeFields
    >({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: todaysPresenceKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: todaysPresenceKeys.listCount()
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.excel()
        });
        queryClient.invalidateQueries({
          queryKey: todaysPresenceKeys.excel()
        });
        
        message.success(t("employees.created"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("employees.createError");
          
        message.error(msg);
      },
    }),
  };
}

export function useUpdateEmployee() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IEmployee>, 
      AxiosError<IApiResponse<IEmployee>>, 
      IUpdateEmployeeFields
    >({
      mutationFn: api.update,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.byId(variables.employeeId)
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.profile(variables.employeeId)
        });
        queryClient.invalidateQueries({
          queryKey: todaysPresenceKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.excel()
        });
        queryClient.invalidateQueries({
          queryKey: todaysPresenceKeys.excel()
        });
        
        message.success(t("employees.updated"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("employees.updateError");
          
        message.error(msg);
      },
    }),
  };
}
