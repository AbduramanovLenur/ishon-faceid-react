import { QueryCache, QueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import axios from 'axios';

import i18n from '../config/i18n';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data?.message || i18n.t('common.fetchError'));
  }

  return i18n.t('common.fetchError');
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      message.error(getErrorMessage(error));
      window.location.replace('/');
    },
  }),

  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});