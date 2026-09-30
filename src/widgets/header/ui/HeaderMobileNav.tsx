import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import { useLogout } from "@features/auth";
import { useUser } from "@entities/user";
import { getNavigations } from "@shared/config";

import styles from "./Header.module.scss";

interface IHeaderMobileNavProps {
  onClose: () => void;
}

const HeaderMobileNav: FC<IHeaderMobileNavProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useUser();
  const { mutate: logout, isPending } = useLogout();

  const items = getNavigations(t).filter(
    (nav) => user?.type && nav.roles.includes(user.type)
  );

  return (
    <nav className={styles["header-mobile__nav"]}>
      <ul className={styles["header-mobile__nav-list"]}>
        {
          !isLoading ? (
            items.map((item) => (
              <li key={item.id} className={styles["header-mobile__nav-item"]}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["header-mobile__nav-link"]} ${styles["header-mobile__nav-link--active"]}`
                      : styles["header-mobile__nav-link"]
                  }
                >
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use href={`/icons/sprite.svg#icon-${item.icon}`}></use>
                    </svg>
                  </span>
                  <span>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))
          ) : (
            <div className={styles['header-mobile__nav-skeletons']}>
              <Skeleton.Node className={styles['header-mobile__nav-skeleton']} />
              <Skeleton.Node className={styles['header-mobile__nav-skeleton']} />
              <Skeleton.Node className={styles['header-mobile__nav-skeleton']} />
            </div>
          )
        }
        <li className={styles["header-mobile__nav-item"]}>
          <button
            className={styles["header-mobile__nav-logout"]}
            type="button"
            onClick={() => logout()}
            disabled={isPending}
          >
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href={`/icons/sprite.svg#icon-logout`}></use>
              </svg>
            </span>
            <span>{t("navigation.logout")}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMobileNav;
