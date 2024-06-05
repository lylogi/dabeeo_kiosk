import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styles from './style.module.css';
import HoriSideBar from '../../components/horizontal/HoriSideBar';
import { useTranslation } from 'react-i18next';
import { MenuContext } from "../../context/MenuContext";
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_LINK, MAIN_LINK } from './../../data/constants/menu';
import { getSecondDefference } from '../../helper/utils';
import { SET_TIME } from '../../constants/time';
import { LANGUAGE_TYPE } from '../../constants/common';
import Footer from '../../components/Footer';
interface MainLayoutProps {
    children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const { t, i18n } = useTranslation();
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const [ lastEventTime, setLastEventTime ] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const backTime = Number(localStorage.getItem('waiting_time') ? localStorage.getItem('waiting_time') : 300);
    const checkBackTime = backTime == 1 ? backTime : Math.ceil(backTime/2);

    let time = new Date();
    useEffect(() => {
        i18n.changeLanguage(LANGUAGE_TYPE.VI);

        setTimeout(()=>{
            const interval  = setInterval(() => {
                let timeOut = getSecondDefference(new Date(), time);
                if(timeOut >= backTime ){
                    clearInterval(interval);
                    navigate("/");
                }
            },checkBackTime);
        })

        // document.addEventListener("click", function (e){   
        //     time = new Date(); 
        //     setLastEventTime(new Date());
        // });

        document.addEventListener("touchend", function (e){
            time = new Date(); 
            setLastEventTime(new Date());
        });
    }, []);    

    useEffect(()=>{
        const activeMenuType : any = Object.keys(DASHBOARD_LINK).find(key => MAIN_LINK.DASHBOARD_MAIN + '/' + DASHBOARD_LINK[key] === location.pathname);
        setActiveMenu(activeMenuType || MAIN_LINK.DASHBOARD_MAIN);
    }, [location.pathname]);

    return (
        <>
            <Container fluid className={i18n.language}>
                <div className={`d-flex`}>
                    <div className={styles.mainContentWrapper}>
                        {children}
                    </div>
                    <div className={styles.sidebarWrapper}>
                        <HoriSideBar />
                    </div>
                </div>
                <Footer />
            </Container>
        </>
    );
}

export default MainLayout;