import React from 'react';
import PlayLogic from './PlayLogic';
import PlayerInput from './PlayerInput';
import PlayerGame from './PlayerGame';

const Game = () => {
  const {
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
  } = PlayLogic();

  return (
    <>
      <PlayerInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        addPlayer={addPlayer}
        startGame={startGame}
        gameStarted={gameStarted}
        players={players}
      />
      {gameStarted ? (
        <PlayerGame
          players={players}
          turn={turn}
          handleMove={handleMove}
          checkPlayers={checkPlayers}
          newGame={newGame}
          wowMessage={wowMessage}
          allPlayers={allPlayers}
          sortedPlayers={sortedPlayers}
          lowestAveragePlayers={lowestAveragePlayers}
        />
      ) : null}
    </>
  );
};

export default Game;
