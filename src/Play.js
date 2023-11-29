import React, { useState } from 'react';

import './Play.css';

const Game = () => {
  const [player1, setPlayer1] = useState(Math.floor(Math.random() * 100) + 1);
  const [player2, setPlayer2] = useState(Math.floor(Math.random() * 100) + 1);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  const handleMove = (operation) => {
    if (turn === 1) {
      const newPlayer1 = applyOperation(player1, operation);
      setPlayer1(newPlayer1);
      setTurn(2);
      checkWinner(newPlayer1, player2);
    } else {
      const newPlayer2 = applyOperation(player2, operation);
      setPlayer2(newPlayer2);
      setTurn(1);
      checkWinner(player1, newPlayer2);
    }
  };

  const applyOperation = (number, operation) => {
    switch (operation) {
      case 'add':
        return number + 1;
      case 'subtract':
        return number - 1;
      case 'multiply':
        return number * 2;
      case 'divide':
        return number / 2;
      default:
        return number;
    }
  };

  const checkWinner = (player1, player2) => {
    if (player1 === 100) {
      setWinner(1);
    } else if (player2 === 100) {
      setWinner(2);
    }
  };

  return (
    <div>
      <h1>Number Game</h1>
      {winner ? (
        <p>Player {winner} wins!</p>
      ) : (
        <div>
          <p>Player 1: {player1}</p>
          <p>Player 2: {player2}</p>
          <button onClick={() => handleMove('add')}>Add 1</button>
          <button onClick={() => handleMove('subtract')}>Subtract 1</button>
          <button onClick={() => handleMove('multiply')}>Multiply by 2</button>
          <button onClick={() => handleMove('divide')}>Divide by 2</button>
        </div>
      )}
    </div>
  );
};

export default Game;
