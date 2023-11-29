// VirtualKeyboard.js
import React, { useState } from 'react';
import KeyboardInput from './KeyboardInput';
import LanguageButtons from './LanguageButtons';
import ColorSelector from './ColorSelector';
import FontSizeSelector from './FontSizeSelector';
import KeyContainer from './KeyContainer';

import './VirtualKeyboard.css';

const VirtualKeyboard = () => {
    const [inputValue, setInputValue] = useState([]);
    const [language, setLanguage] = useState('hebrew');
    const [selectedColor, setSelectedColor] = useState('blue');
    const [textColor, setTextColor] = useState('blue');
    const [selectedFontSize, setSelectedFontSize] = useState('20');
    const [fontSize, setFontSize] = useState('20');

    const handleKeyClick = (key) => {
        setInputValue((prevValue) => [
            ...prevValue,
            <span key={prevValue.length} style={{ color: textColor, fontSize: Number(fontSize) }}>
                {key}
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
                    key={character}
                    className='key btn btn-light'
                    onClick={() => handleKeyClick(character)}
                >
                    {character}
                </button>
            );
        }
        return <div className='key-container'>{characters}</div>;
    };

    return (
        <div id='virtual-keyboard'>
            <KeyboardInput inputValue={inputValue} />
            <LanguageButtons setLanguage={setLanguage} language={language} setInputValue={setInputValue} />
            <ColorSelector
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                setTextColor={setTextColor}
            />
            <FontSizeSelector
                selectedFontSize={selectedFontSize}
                setSelectedFontSize={setSelectedFontSize}
                setFontSize={setFontSize}
            />
            <KeyContainer language={language} handleKeyClick={handleKeyClick} />
        </div>
    );
};

export default VirtualKeyboard;
