import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import CalenderIcon from "../../images/calender_d.svg";
import useFormatDateTime from "../../hooks/datetime/useFormatDateTime";
import { getMedia, getTitleByLang } from "../../helper/utils";
import MarkerIcon from "../../images/marker_d.svg";
import { useContext, useCallback, useEffect } from "react";
import { EventContext } from "../../context/EventContext";
import defaultImage from "../../images/image_poi_default.png";
import { LogContext } from "../../context/LogContext";
import { LOG_TYPE } from "../../constants/logType";

interface Props {
    eventData: any;
    isActive: boolean;
}

const EventDetail = ({ eventData, isActive }: Props) => {
    const { t, i18n } = useTranslation();
    const { language } = i18n;
    const { setEventId, eventId } = useContext(EventContext);
    const { saveLog, branchId } = useContext(LogContext);
    let urlImage = '';

    useEffect(() => {
        if(isActive) {
            const data = {
                event_id: eventData?.id,
                branch_id: branchId,
            }
            saveLog(LOG_TYPE.EVENT, data);
        }
    }, [isActive])

    const getImageUrl = useCallback(() => {
        if (eventData?.seqCode[language]) {
            urlImage = getMedia(eventData?.seqCode[language]);
        } else urlImage = defaultImage;

        return urlImage;
    }, [language, eventData?.seqCode]);

    const handleScrollStart = useCallback((e: any) => {
        const eTarget = e.target;
        eTarget.touchStartY = e.touches[0].clientY;
        eTarget.scrollTop = eTarget.scrollTop;
    }, [])

    const handleScrollMove = useCallback((e: any) => {
        const eTarget = e.target;
        var deltaY = eTarget.touchStartY - e.touches[0].clientY;

        if(deltaY > 0) {
            deltaY = deltaY*0.8;
            eTarget.scrollTop = eTarget.scrollTop + deltaY;
        } else {
            deltaY = deltaY*1.2;
            eTarget.scrollTop = eTarget.scrollTop + deltaY;
        }
        // Scroll the element
    }, [])


    return (
        <>
            <div className={styles.eventDetailWrapper}>
                <div className={styles.eventDetailImage} style={{
                    backgroundImage: `url(${getMedia(eventData?.seqCode[language])}), url(${defaultImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'}}>
                    <img src={getImageUrl()} alt={eventData?.title[language]} />
                    {eventData?.fullScreen && <button className={styles.eventListBtn} onClick={() => setEventId('')}>{t('event.eventListBtn')}</button>}
                </div>
                {!eventData?.fullScreen &&
                    <div className={styles.eventDetailContent}>
                        <div>
                            <h1 className={styles.eventTitle}>{getTitleByLang(eventData?.title, language)}</h1>
                            <div className={styles.eventDate}>
                                <span>
                                    <img src={CalenderIcon} />
                                </span>
                                <span>{useFormatDateTime(eventData?.displayStartDate, language)}</span>
                                <span>&#126;</span>
                                <span>{useFormatDateTime(eventData?.displayEndDate, language)}</span>
                            </div>
                            {eventData?.pois?.length > 0 && (
                                <div className={`${styles.eventPois} scroll--simple`}
                                     onTouchStart={handleScrollStart}
                                     onTouchMove={handleScrollMove}>
                                    {eventData?.pois.map((poi: any) => (
                                        <div className={styles.eventPoiItem} key={poi?.id}>
                                            <img src={MarkerIcon} />
                                            <span className={styles.eventPoiFloor}>{poi?.floor?.title}</span>
                                            <span className={styles.eventPoiItemBar}></span>
                                            <span>{poi.title[language]}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {eventData?.content[language] &&
                            <div className={`${styles.eventContent} scroll--simple`} 
                                id={`eventContent_${eventData?.id}`}
                                onTouchStart={(e) => handleScrollStart(e)}
                                onTouchMove={(e) => handleScrollMove(e)}
                                dangerouslySetInnerHTML={{ __html: eventData?.content[language] }}>
                            </div>
                        }
                        <button className={styles.eventListBtn} onClick={() => setEventId('')}>{t('event.eventListBtn')}</button>
                    </div>}
            </div>
        </>
    );
};

export default EventDetail;
