import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IUpdateObjectFields, ICreateObjectFields } from "./types";

import { objectsKeys, type IObject } from "@entities/objects";
import type { IApiResponse } from "@shared/types";

export function useCreateObject () {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IObject>, 
      AxiosError<IApiResponse<IObject>>, 
      ICreateObjectFields
    >({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: objectsKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: objectsKeys.manualList()
        });
        queryClient.invalidateQueries({
          queryKey: objectsKeys.excel()
        });
        
        message.success(t("objects.created"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("objects.createError");
          
        message.error(msg);
      },
    }),
  };
}

export function useUpdateObject() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IObject>, 
      AxiosError<IApiResponse<IObject>>, 
      IUpdateObjectFields
    >({
      mutationFn: api.update,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: objectsKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: objectsKeys.byId(variables.objectId)
        });
        queryClient.invalidateQueries({
          queryKey: objectsKeys.manualList()
        });
        queryClient.invalidateQueries({
          queryKey: objectsKeys.excel()
        });
        
        message.success(t("objects.updated"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("objects.updateError");
          
        message.error(msg);
      },
    }),
  };
}