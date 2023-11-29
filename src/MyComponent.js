import React from 'react';

class MyComponent extends React.Component {
  render() {
    const startAscii = 65; 
    const endAscii = 90;  
    const characters = [];
    for (let asciiValue = startAscii; asciiValue <= endAscii; asciiValue++) {
      const character = String.fromCharCode(asciiValue);
      characters.push(
        <div key={asciiValue}>
          {character}
        </div>
      );
    }

    return (
      <div>
        {characters}
      </div>
    );
  }
}

export default MyComponent;
