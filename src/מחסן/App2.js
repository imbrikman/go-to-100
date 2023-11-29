import React from 'react';
import ReactDOM from 'react-dom';

const App2 = () => {
  const pet = {
    name: "Fido",
    type: "Dog",
    age: 3,
  };

  const message = (
    <p>
      {pet.name.toUpperCase()} is a {pet.type.toUpperCase()} and it is {pet.age} years old.
    </p>
  );

  return (
    <div>
      {message}
    </div>
  );
}

export default App2;
