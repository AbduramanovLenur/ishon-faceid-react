import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";
import { useTranslation } from "react-i18next";

import type { IUpdateCompanyFields, TCreateCompanyFields } from "./types";
import { api } from "../api/api";

import { companiesKeys, type ICompany } from "@entities/companies";
import type { IApiResponse } from "@shared/types";

export function useCreateCompany() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompany>, 
      AxiosError<IApiResponse<ICompany>>, 
      TCreateCompanyFields
    >({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: companiesKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: companiesKeys.manualList()
        });
        
        message.success(t("companies.created"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("companies.createError");
          
        message.error(msg);
      },
    }),
  };
}

export function useUpdateCompany() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompany>, 
      AxiosError<IApiResponse<ICompany>>, 
      IUpdateCompanyFields
    >({
      mutationFn: api.update,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: companiesKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: companiesKeys.byId(variables.companyId)
        });
        queryClient.invalidateQueries({
          queryKey: companiesKeys.manualList()
        });
        
        message.success(t("companies.updated"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("companies.updateError");
          
        message.error(msg);
      },
    }),
  };
}