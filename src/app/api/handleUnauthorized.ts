import { api } from "@features/auth";

import { clearTokens } from "@shared/api";
import { routes } from "@shared/config";
import { insideTelegram } from "@shared/lib";

export function handleUnauthorized(): void {
  if (window.location.pathname === routes.AUTH) {
    return;
  }

  if (insideTelegram) {
    clearTokens();

    window.location.reload();

    return;
  }

  api
    .logout()
    .then(() => {
      clearTokens();

      window.location.href = routes.AUTH;
    })
    .catch(() => undefined);
}
