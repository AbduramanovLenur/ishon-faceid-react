import { useEffect, type FC, type ReactNode } from "react";
import { Spin } from "antd";

import { useSessionRestore } from "@features/auth";
import { USER_ID_KEY } from "@entities/user";
import { useStorage } from "@shared/lib";

interface IProps {
  children: ReactNode;
};

const SessionProvider: FC<IProps> = ({ children }) => {
  const userId = useStorage(USER_ID_KEY);
  const shouldRestore = Boolean(userId);
  const { mutateAsync, isSuccess, isError, isPending } = useSessionRestore();
  const isRestored =  isSuccess || isError;

  useEffect(() => {
    if (shouldRestore) mutateAsync();
  }, [shouldRestore, mutateAsync]);

  if ((shouldRestore && !(isRestored)) || isPending) {
    return <div className="spin">
      <Spin className="spin-loader" size="large" />
    </div>;
  }

  return children;
}

export default SessionProvider;
