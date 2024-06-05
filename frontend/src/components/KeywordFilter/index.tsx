import styles from './style.module.css';
import KeyBoard from "../KeyBoard";
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardReactInterface } from 'react-simple-keyboard';
import { SearchContext } from '../../context/SearchContext';
import { LogContext } from '../../context/LogContext';
import { LOG_TYPE, LOG_POI_SUB_TYPE } from '../../constants/logType';
import { LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { DataContext } from '../../context/DataContext';

const handleScrollStart = (e: any) => {
    const eTarget = e.target;
    eTarget.touchStartY = e.touches[0].clientY;
    eTarget.scrollTop = eTarget.scrollTop;
}

const handleScrollMove = (e: any) => {
    const eTarget = e.target;
    var deltaY = eTarget.touchStartY - e.touches[0].clientY;
    // Scroll the element
    eTarget.scrollTop = eTarget.scrollTop + deltaY;
}

const KeywordFilter = () => {
    const { t, i18n } = useTranslation();    
    const { language } = i18n;
    const inputRef = useRef<HTMLInputElement>(null);
    const {setTagContent, setKeyword, setSubType, setTagId, keyword, tagContent, type, tab } = useContext(SearchContext);
    const { tagsFilter } = useContext(DataContext);
    const [input, setInput] = useState('');
    const [showTagPopup, setShowTagPopup] = useState(true);
    const [tagsByKeyword, setTagsByKeyword] =  useState([]);
    const keyboard = useRef<KeyboardReactInterface | null>(null);
    const [activeKey, setActiveKey] = useState('');
    const { saveLog } = useContext(LogContext);
    const branches =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.BRANCHES) || '{}');

    const onChangeInput = (content: string): void => {
      setShowTagPopup(true);
      if(keyboard && keyboard.current)
        keyboard.current.setInput(content);
    };

    var timeout: any;

    const onClearInput = useCallback(() => {
        setInput('');
        setKeyword('');
        setTagContent('');
        setShowTagPopup(false);
        if(keyboard && keyboard.current){
            keyboard.current.setInput('');
        }
    }, []);

    const onKeyPress = (button: string) => {
        if(activeKey) return;

        switch(button) {
            case '{bksp}': {
                setActiveKey(button);
                setInput(input.slice(0,-1));
                break;
            }
            case '{space}': {
                setActiveKey(button);
                setInput(input + ' ');
                break;
            }
            default: {
                setActiveKey(button);
                setInput(input + button);
                break;
            }
        }
    };

    const onKeyReleased = useCallback((inputFocus: string) => {
        clearTimeout(timeout);
        // Reset the currently pressed key
        setActiveKey('');
        timeout = setTimeout(() => {
            focus(inputFocus);
        }, 1)
    }, []);

    useEffect(() => {
        setKeyword('');
        setInput('');
    }, [type])

    const focus = useCallback((inputFocus: string) => {
        if(inputRef && inputRef.current) {
            inputRef.current.focus();
            const caretPos = inputFocus?.length + 1;
            inputRef.current.setSelectionRange(caretPos, caretPos);
        }
    }, [])

    useEffect(() => {
        setInput('')
        if(keyboard && keyboard.current)
            keyboard.current.setInput('');
    }, [language, type, tab])

    useEffect(() => {
        setInput(keyword)
        if(keyboard && keyboard.current)
            keyboard.current.setInput(keyword);
    }, [keyword])

    useEffect(() => {
        if(tagContent === '') {
            setInput('');
        }
    }, [tagContent])

    useEffect(() => {
        if(input?.length > 1) {
            setTagsByKeyword(tagsFilter?.filter((tag: any) => tag?.content?.toLowerCase()?.includes(input?.toLowerCase())));
        } else {
            setTagsByKeyword([]);
        }
    }, [input])

    const handleSelectTag = useCallback((content: string, id: number) => {
        setShowTagPopup(false);
        setInput("#" + content);
        setTagContent(content);
        setTagId(id);
        setSubType(LOG_TYPE.HASHTAG);
        
        const data = {
            sub_type: LOG_POI_SUB_TYPE.SEARCH_CLICK,
            hashtag_id: id,
            branch_id: branches?.main?.id
        }
        saveLog(LOG_TYPE.HASHTAG, data);

        if(keyboard && keyboard.current)
            keyboard.current.setInput("#" + content);
    }, [])

    const handleSearch = useCallback((inputSearch: string, keywordSearch: string) => {
        if(keywordSearch === '' && inputSearch === '') {
            return;
        }

        if(!inputSearch.includes('#')) {
            setSubType(LOG_TYPE.KEYWORD);
            const data = {
                sub_type: LOG_POI_SUB_TYPE.SEARCH_CLICK,
                content: inputSearch,
                branch_id: branches?.main?.id
            }
            saveLog(LOG_TYPE.KEYWORD, data);
        }

        setKeyword(inputSearch || '');
        setShowTagPopup(false);
    }, [])
    
    return (
        <div className={styles.keywordFilterWrapper}>
            <div className={styles.inputWrapper}>
                {tagsByKeyword?.length > 0 && showTagPopup && (
                    <div className={styles.tagsWrapper} >
                        <div className={`${styles.tags} scroll--simple`}
                            onTouchStart={(e) => handleScrollStart(e)}
                            onTouchMove={(e) => handleScrollMove(e)}>
                            {tagsByKeyword.map((tag: any )=> (
                                <span className={styles.tagItem} key={tag.id} onClick={() => handleSelectTag(tag.content, tag.id)}>&#35;{tag.content}</span>
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles.input} onClick={() => onKeyReleased(input)}>
                    <input value={input} placeholder={t('search.placeholder') || ''} ref={inputRef} autoFocus={true} onChange={() => {}} />
                    <button className={`${styles.clearInput} ${input?.length > 0 && styles.active}`} onClick={() => onClearInput()}></button>
                </div>
                <KeyBoard keyboardRef={keyboard} onChange={onChangeInput} onKeyPress={onKeyPress} onKeyReleased={() => onKeyReleased(input)}/>
            </div>
            <div>
                <button className={styles.searchBtn} onClick={() => handleSearch(input, keyword)}>{t('search.search')}</button>
            </div>
        </div>
    );
};

export default KeywordFilter;
