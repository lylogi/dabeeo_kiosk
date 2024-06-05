import { useState, ReactNode, createContext, useEffect, useContext } from 'react';
import { Swiper } from 'swiper/types';
import { DataContext } from './DataContext';

type EventContext = {
    activeIndexSlide: number;
    setActiveIndexSlide: (active: number) => void;
    setSwiper: (swiper: Swiper) => void;
    eventData: any;
    eventId: string;
    setEventId: (eventId: string) =>  void;
    eventLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventContext = createContext<EventContext>(
    {} as EventContext
);

type Props = {
    children: ReactNode;
};

export function EventProvider({ children }: Props) {
    const { eventData, eventLoading } = useContext(DataContext);
    const [eventId, setEventId] = useState<string>('');
    const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);
    const [swiper, setSwiper] = useState<Swiper>();

    return (
        <EventContext.Provider value={{ activeIndexSlide, setActiveIndexSlide, setSwiper, eventData, eventLoading, eventId, setEventId }} >
            {children}
        </EventContext.Provider>
    );
}