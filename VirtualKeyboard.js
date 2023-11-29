import React, { useState } from 'react';
import './VirtualKeyboard.css';

const VirtualKeyboard = () => {
    const [inputValue, setInputValue] = useState([]);
    const [language, setLanguage] = useState('hebrew');
    const [selectedColor, setSelectedColor] = useState('blue');
    const [textColor, setTextColor] = useState('blue');
    const [selectdFontSize, setSelectdFontSize] = useState('20');
    const [fontSize, setFontSize] = useState('20');

    const handleKeyClick = (key) => {
        setInputValue((prevValue) => [
            ...prevValue,
            <span key={prevValue.length} style={{ color: textColor, fontSize: Number(fontSize) }}>
                {key}
            </span>,
        ]);
    };

    const blabla = (key) => {
        setInputValue((prevValue) => [
            <span key={prevValue.length} style={{ color: textColor, fontSize: Number(fontSize) }}>
                ...{prevValue}
            </span>,
        ]);
    };

    const calculateCharRange = (language) => {
        switch (language) {
            case 'hebrew':
                return { start: 1488, end: 1514 };
            case 'englishUpper':
                return { start: 65, end: 90 };
            case 'englishLower':
                return { start: 97, end: 122 };
            default:
                return { start: 1488, end: 1514 }; // Default to Hebrew
        }
    };

    const renderKeys = () => {
        const { start, end } = calculateCharRange(language);
        const characters = [];

        for (let asciiValue = end; asciiValue >= start; asciiValue--) {
            const character = String.fromCharCode(asciiValue);
            characters.unshift(
                <button
                    key={character}  //  asciiValue
                    className='key btn btn-light'
                    onClick={() => handleKeyClick(character)}
                >
                    {character}
                </button>
            );
        }
        return <div className='key-container'>{characters}</div>;
    };

    const colorOptions = ['blue', 'red', 'green', 'purple', 'bleak', 'orange']; // ניתן להוסיף צבעים נוספים לרשימה
    const handleColorChange = (color) => {
        setSelectedColor(color);
        setTextColor(color);
    };

    const fontSizeOptions = ['10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36']; // ניתן להוסיף צבעים נוספים לרשימה
    const handleFontSizeChange = (fontSize) => {
        setSelectdFontSize(fontSize);
        setFontSize(fontSize);
    };

    return (
        <div id='virtual-keyboard'>
            <div id='keyboard-input'>{inputValue}</div>
            <div className='language-buttons'>
                <button className='btn btn-danger' onClick={() => setInputValue((prevValue) => prevValue = '')}>
                    ניקוי
                </button>
                <button className='btn btn-danger' onClick={() => setInputValue((prevValue) => prevValue.slice(0, -1))}>
                    מחיקה
                </button>
                <button className={`btn ${language === 'englishLower' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setLanguage('englishLower')}>
                    אנגלית קטנות
                </button>
                <button className={`btn ${language === 'englishUpper' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setLanguage('englishUpper')}>
                    אנגלית גדולות
                </button>
                <button className={`btn ${language === 'hebrew' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setLanguage('hebrew')}>
                    עברית
                </button>

                <button onClick={blabla}>
                    החל שינויים
                </button>

                <button>
                    <div>
                        <label htmlFor="colorSelector"> בחר צבע  גופן  </label>
                        <select
                            id="colorSelector"
                            value={selectedColor}
                            onChange={(e) => handleColorChange(e.target.value)}
                        >
                            {colorOptions.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>
                </button>
                <button>
                    <div>
                        <label htmlFor="r">בחר גודל גופן </label>
                        <select
                            id="colorSelector"
                            value={selectdFontSize}
                            onChange={(e) => handleFontSizeChange(e.target.value)}
                        >
                            {fontSizeOptions.map((fontSize) => (
                                <option key={fontSize} value={fontSize}>
                                    {fontSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </button>
            </div>
            {renderKeys()}
        </div>
    );
};

export default VirtualKeyboard;


