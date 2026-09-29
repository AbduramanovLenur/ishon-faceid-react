import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@shared/config";
import { insideTelegram } from "@shared/lib";

const RequireTelegram: FC = () => {
  if (!insideTelegram) {
    return <Navigate to={routes.HOME} replace />;
  }

  return <Outlet />;
}

export default RequireTelegram;
