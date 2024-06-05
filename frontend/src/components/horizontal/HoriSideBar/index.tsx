import { Nav } from "react-bootstrap";
import styles from "./style.module.scss";
import { useContext } from "react";
import HoriMenuItem from "../HoriMenuItem";
import { IMenu } from "../../../interfaces/menu.interface";
import { MenuContext } from "../../../context/MenuContext";

const HoriSideBar = () => {
  const { activeMenu, setActiveMenu , data} = useContext(MenuContext);
  return (
      <div className="sidebar">
        <Nav className={`${styles.sidebar} flex-column col-12 d-flex`} >
            {(data?.data && data?.data.length > 0) && data?.data.map((item: IMenu) => (
              <HoriMenuItem key={item.id}
                            id={item.id}
                            type={item.type}
                            isActive={activeMenu === item.type}
                            title={item.title}
                            handleTouch={setActiveMenu}/>
            ))}
        </Nav>
      </div>
  );
};

export default HoriSideBar;
