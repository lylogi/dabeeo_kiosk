import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { MENU_ICON_DARK, MENU_ICON_LIGHT, DASHBOARD_LINK } from "../../../data/constants/menu";
import { useTranslation } from "react-i18next";
import { useCallback, useContext } from "react";
import { LogContext } from "../../../context/LogContext";
import { LOG_TYPE } from "../../../constants/logType";

interface HoriMenuItemProps {
  id: string;
  type: string;
  title: {
    [key: string]: string;
  };
  isActive?: boolean;
  handleTouch: (id: string) => void;
}

const HoriMenuItem = ({ id, type, title, isActive, handleTouch }: HoriMenuItemProps) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { saveLog, branchId } = useContext(LogContext);
  const handleTouchMenu = useCallback(() => {
    const dataLog = {
      menu_id: id,
      branch_id: branchId,
    }
    saveLog(LOG_TYPE.MENU, dataLog);
    handleTouch(type);
  }, [type])
  return (
    <Link to={`/app/${DASHBOARD_LINK[type]}`}
      state={{id: id, type: type}}
      onClick={() => handleTouchMenu()}
      className={`${styles.menuItem} ${isActive && styles.active} flex-fill d-flex`}>
      <span className={styles.menuIconWrapper} >
        <img className={styles.menuIcon} src={isActive ? MENU_ICON_LIGHT[type] : MENU_ICON_DARK[type]} alt={type} />
      </span>
      <span className={`${styles.menuTitle} d-flex align-items-center`}>{title[language]}</span>
    </Link>
  );
};

export default HoriMenuItem;
