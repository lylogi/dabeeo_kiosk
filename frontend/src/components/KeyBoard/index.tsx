import styles from './style.module.css';
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../../scss/custom_keyboard.scss";
import { MutableRefObject } from 'react';


interface IProps {
    onChange: (content: string) => void;
    keyboardRef: MutableRefObject<KeyboardReactInterface | null>;
    onKeyReleased: () => void;
    onKeyPress: (content: string) => void;
}

const KeyBoard = ({onChange, keyboardRef,onKeyReleased, onKeyPress}: IProps) => {
    const keyboardOptions = {
        layoutName: "default",
        input: "",
        layout: {
          'default': [
            '0 1 2 3 4  A B C D E F G H I J K L M {bksp}',
            '5 6 7 8 9  N O P Q R S T U V W X Y Z {space}',
          ]
        },
        display: {
            '{bksp}': ' ',
            '{space}': ' ',
        },
        keyboardRef: (r: any) => (keyboardRef.current = r),
        onChange: onChange,
        onKeyReleased: onKeyReleased,
        onKeyPress: onKeyPress
    }

    return (
        <div className={styles.keyboardWrapper}>
            <Keyboard {...keyboardOptions} />
        </div>
    );
};

export default KeyBoard ;
