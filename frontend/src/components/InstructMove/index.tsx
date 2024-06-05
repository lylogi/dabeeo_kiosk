import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import IconInstruct from "../../images/icon_elavator_move.svg";
import { useEffect } from "react";
import { SET_TIME } from "../../constants/time";

interface Props {
    show: boolean
    setShow: (params: boolean) => void;
    data: any;
    timeout: number;
}

const InstructMove = ({ show, setShow, data, timeout } : Props) => {    
    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        const timer =  setTimeout (() => {
            setShow(false);
        }, timeout);

        return () => {
            clearTimeout(timer)
        }
    }, [])
    
    return (
            <Modal className={styles.instruct_map} backdropClassName="newBackdrop" show={show} onHide={handleClose}>
            <Modal.Body className={styles.instruct_map_ct}>
                {data}
            </Modal.Body>
            </Modal>
        );
  };

export default InstructMove;
