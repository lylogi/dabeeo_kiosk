
import { useEffect, useRef } from 'react';
import { getMedia } from '../../helper/utils';
import { useSwiper } from 'swiper/react';

const VideoItem = ({ name, isActive }: any) => {
    const swiper = useSwiper();
    let videoRef = useRef(null);

    useEffect(() => {
        if(isActive && videoRef?.current){
            let activeSlideVideo = videoRef?.current;
            activeSlideVideo?.play();
        }
        if(!isActive) {
            let activeSlideVideo = videoRef?.current;
            !activeSlideVideo?.paused && activeSlideVideo?.pause();
        }

    }, [isActive]);

    const onEnded = () => {
        swiper?.slideNext();
    }

    return (
        <>
            <video key={name} ref={videoRef} className='video-active' src={getMedia(name)} muted={true} onEnded={onEnded}></video>
                
        </>
    )
}

export default VideoItem;
