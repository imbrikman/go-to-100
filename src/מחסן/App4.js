import React, { useState, useEffect } from 'react';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('english');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('black');
  const [isUpperCase, setIsUpperCase] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = fontSize;
    document.body.style.fontFamily = fontFamily;
    document.body.style.color = textColor;
  }, [fontSize, fontFamily, textColor]);

  const handleLanguageChange = () => {
    setLanguage((prevLang) => (prevLang === 'english' ? 'hebrew' : 'english'));
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  const handleFontFamilyChange = (newFamily) => {
    setFontFamily(newFamily);
  };

  const handleTextColorChange = (newColor) => {
    setTextColor(newColor);
  };

  const handleCaseChange = () => {
    setIsUpperCase((prevCase) => !prevCase);
  };

  const handleSpecialAction = (action) => {
    switch (action) {
      case 'delete':
        setText((prevText) => prevText.slice(0, -1));
        break;
      case 'clear':
        setText('');
        break;
      case 'undo':
        // Implement your undo logic here
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e) => {
    const char = String.fromCharCode(e.keyCode).toLowerCase();
    if (char) {
      handleTextInput(isUpperCase ? char.toUpperCase() : char);
    }
  };

  const handleTextInput = (char) => {
    setText((prevText) => prevText + char);
  };

  return (
    <div>
      <div>
        <button onClick={handleLanguageChange}>Change Language</button>
        <button onClick={() => handleFontSizeChange('14px')}>Small Font</button>
        <button onClick={() => handleFontSizeChange('18px')}>Medium Font</button>
        <button onClick={() => handleFontSizeChange('24px')}>Large Font</button>
        <button onClick={() => handleFontFamilyChange('Arial')}>Arial Font</button>
        <button onClick={() => handleFontFamilyChange('Times New Roman')}>Times New Roman Font</button>
        <button onClick={() => handleTextColorChange('black')}>Black Text</button>
        <button onClick={() => handleTextColorChange('red')}>Red Text</button>
        <button onClick={handleCaseChange}>Toggle Case</button>
      </div>
      <textarea
        rows={10}
        cols={50}
        value={text}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
      />
      <div>
        <button onClick={() => handleSpecialAction('delete')}>Delete Last Character</button>
        <button onClick={() => handleSpecialAction('clear')}>Clear Text</button>
        <button onClick={() => handleSpecialAction('undo')}>Undo</button>
      </div>
    </div>
  );
};

export default TextEditor;
 