import RestroomIcon from "../images/restroom_icon_b.svg";
import EscalatorIcon from "../images/escalator_icon_b.svg";
import ElevatorIcon from "../images/elevator_icon_b.svg";
import LoungeIcon from "../images/lounge_icon.svg";
import BabyLoungeIcon from "../images/baby_icon.svg";
import InformationIcon from "../images/information_icon.svg";
import SmokingIcon from "../images/smoking_room.svg";
import MedicalIcon from "../images/medical_room.svg";
import RepairServiceIcon from "../images/repair_service.svg";
import RestAreaIcon from "../images/rest_area.svg";
import ATMIcon from "../images/atm.svg";
import LockerIcon from "../images/locker_service.svg";


export const facilitiesBarCatCode = ['002', '017', '05'];

export const categoriesExcludeShop = ['002', '014', '017', '010', '016'];

export const catCodeNoSaveLog = ['014', '015', '016', '017', '17', '18'];
export const shopCategories = ['001', '002', '03', '006', '007', '008', '009', '011', '012', '013', '014', '015'];

export const mapCatCodeFNB = ["001"];
export const mapCatCodeParking = ["015", "016"];

export const facilitiesFixedOrder = [
    {
        code: "017",
        order: 1,
        iconImage: RestroomIcon
    },
    {
        code: "17",
        order: 2,
        iconImage: EscalatorIcon
    },
    {
        code: "18",
        order: 3,
        iconImage: ElevatorIcon
    },
    {
        code: "10",
        iconImage: LoungeIcon,
    },
    {
        code: "15",
        iconImage: BabyLoungeIcon,
    },
    {
        code: "09",
        iconImage: InformationIcon,
    },
    {
        code: "14",
        iconImage: SmokingIcon,
    },
    {
        code: "16",
        iconImage: MedicalIcon,
    },
    {
        code: "13",
        iconImage: RepairServiceIcon,
    },
    {
        code: "12",
        iconImage: RestAreaIcon,
    },
    {
        code: "37",
        iconImage: LockerIcon,
    },
    {
        code: "38",
        iconImage: ATMIcon,
    }
]
