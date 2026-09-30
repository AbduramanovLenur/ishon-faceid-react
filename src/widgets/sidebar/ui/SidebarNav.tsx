import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import { useLogout } from "@features/auth";
import { useUser } from "@entities/user";
import { getNavigations } from "@shared/config";

import styles from "./SidebarNav.module.scss";

const SidebarNav: FC = () => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useUser();
  const { mutate: logout, isPending } = useLogout();
  const items = getNavigations(t).filter(
    (nav) => user?.type && nav.roles.includes(user.type)
  );

  return (
    <nav className={styles["sidebar-nav"]}>
      <ul className={styles["sidebar-nav__list"]}>
        {
          !isLoading ? (
            items.map((item) => (
              <li key={item.id} className={styles["sidebar-nav__item"]}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["sidebar-nav__link"]} ${styles["sidebar-nav__link--active"]}`
                      : styles["sidebar-nav__link"]
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
            <div className={styles['sidebar-nav__skeletons']}>
              <Skeleton.Node className={styles['sidebar-nav__skeleton']} />
              <Skeleton.Node className={styles['sidebar-nav__skeleton']} />
              <Skeleton.Node className={styles['sidebar-nav__skeleton']} />
            </div>
          )
        }
        <li className={styles["sidebar-nav__item"]}>
          <button className={styles["sidebar-nav__logout"]} type="button" onClick={() => logout()} disabled={isPending}>
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
};
export default SidebarNav;
