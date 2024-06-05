import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import IconInstruct from "../../images/floor_ico_muilti.svg";
import { useEffect } from "react";
import { SET_TIME } from "../../constants/time";

interface Props {
    show: boolean
    setShow: (params: boolean) => void;
}

const Instruct = ({ show, setShow } : Props) => {    
    const { t, i18n } = useTranslation();
    const { language } = i18n;
    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        const timer = setTimeout (() => {
            setShow(false);
        }, SET_TIME.TIME_SHOW_INTRUCT_ZOOM);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    
    return (
            <Modal className={styles.instruct_map} backdropClassName="newBackdrop" show={show} onHide={handleClose}>
            <Modal.Body className={styles.instruct_map_ct}>
                <div className={styles.icon_instruct}> <img src={IconInstruct} alt="instruct icon"/></div>
                <div className={styles.text_instruct}>{t('instruct.zoomAction')}</div>
            </Modal.Body>
            </Modal>
        );
  };

export default Instruct;
