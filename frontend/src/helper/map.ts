import ImgLocation from '../images/locationo_now.png';


export const setMyLocation = async (map: any, coordinateX: string, coordinateY: string) => {
    const locationOption = {
        x: coordinateX,
        y: coordinateY,
        iconOption: {
            positionZ: 0,
            iconUrl: ImgLocation,
            width: 36,
            height: 36,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        },
        onActive: true,
        isKeep: true,
    };
    await map?.mylocation?.set(locationOption);
}