
import { useContext, useEffect, useState } from 'react';
import { getMedia } from '../../helper/utils';
import { TYPE_FILE } from '../../constants/common';
import { LogContext } from '../../context/LogContext';
import { LOG_TYPE } from '../../constants/logType';
import VideoItem from '../VideoItem';

const ScreenItem = ({ type, id, name, duration, isActive, screenType }: any) => {
    const [ startTime, setStartTime ] = useState(0);
    const { saveLog, branchId } = useContext(LogContext);

    useEffect(() => {
        const threshold = duration / 3;
        if(!isActive && startTime > 0) {
            const elapsedTime = Date.now() - startTime;
            if(elapsedTime >= threshold) {
                const data = {
                    screen_id: id,
                    branch_id: branchId,
                    sub_type: screenType
                }
                saveLog(LOG_TYPE.SCREEN, data);
            }
            setStartTime(0)
        } else {
            setStartTime(Date.now())
        };
    }, [isActive]);

    return (
        <>
            {
                type === TYPE_FILE.VIDEO ? (
                    <VideoItem name={name} isActive={isActive} />
                ) : (
                <div key={id} className="slide-image" style={{
                    backgroundImage: `url(${getMedia(name)})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'}}>
                </div>
                )
            }
        </>
    )
}

export default ScreenItem;
