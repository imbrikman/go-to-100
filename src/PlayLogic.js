// PlayLogic.js
import React, { useState } from 'react';
import { sortBy } from 'lodash';

const PlayLogic = () => {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const targetMum = 8;
  const [counter, setcounter] = useState(0);
  const [idAll, setidAll] = useState(0);
  const [wowMessage, setwowMessage] = useState('');

  const addPlayer = (nameP) => {
    const existingPlayer = players.find((player) => player.name === nameP);

    if (existingPlayer) {
      existingPlayer.point = Math.floor(Math.random() * targetMum) + 1;
      alert('שחקן כבר נכנס');
      return;
    }
    if (nameP === '') {
      return;
    }

    const existingPlayerAll = allPlayers.find((player) => player.nameP === nameP);

    if (existingPlayerAll === undefined) {
      const newPlayer = {
        idAll: idAll,
        id: players.length,
        name: nameP,
        point: Math.floor(Math.random() * targetMum),
        numOfOperation: 0,
      };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setPlayerName('');

      setidAll(idAll + 1);

      const memoryPlayer = {
        idAll: 0,
        nameP: nameP,
        plays: 1,
        numOfAllOperation: 0,
      };
      setAllPlayers((prevPlayers) => [...prevPlayers, memoryPlayer]);
    } else {
      const index = allPlayers.indexOf(existingPlayerAll);
      const newPlayer = {
        idAll: allPlayers[index].idAll,
        id: players.length,
        name: nameP,
        point: Math.floor(Math.random() * targetMum),
        numOfOperation: 0,
      };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setPlayerName('');

      existingPlayerAll.plays += 1;
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const handleMove = (operation) => {
    checkPlayers();
    const updatedPlayers = [...players];
    updatedPlayers[turn].point = applyOperation(players[turn].point, operation);
    updatedPlayers[turn].numOfOperation += 1;
    allPlayers.find((player) => player.nameP === players[turn].name).numOfAllOperation += 1;

    setPlayers(updatedPlayers);
    if (players[turn].point === targetMum) {
      const winningPlayer = updatedPlayers[turn];
      setcounter(counter + 1);
      setwowMessage(`השחקן ${winningPlayer.name} סיים `);

      if (counter === players.length - 1) {
        alert('סיום');
        newGame();
      }
    }
    updateTurn();
    checkPlayers();
  };

  const updateTurn = () => {
    if (turn === players.length - 1) {
      setTurn(0);
    } else {
      setTurn(turn + 1);
    }
  };

  const checkPlayers = () => {
    const count = turn;
    for (let i = turn; i < players.length + count; i++) {
      if (count === players.length) {
        break;
      }
      if (players[turn].point !== targetMum) {
        break;
      }
      updateTurn();
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
        return Math.floor(number / 2);
      default:
        return number;
    }
  };

  const newGame = () => {
    setPlayers([]);
    setTurn(0);
    setGameStarted(false);
    setcounter(0);
    players.map((player) => <div key={player.id}></div>);
  };

  const sortedPlayers = sortBy(allPlayers, (player) => player.numOfAllOperation / player.plays);
  const lowestAveragePlayers = sortedPlayers.slice(0, 3);

  return {
    players,
    allPlayers,
    turn,
    gameStarted,
    playerName,
    targetMum,
    counter,
    idAll,
    addPlayer,
    startGame,
    handleMove,
    updateTurn,
    checkPlayers,
    applyOperation,
    newGame,
    sortedPlayers,
    lowestAveragePlayers,
    wowMessage,
  };
};

export default PlayLogic;
