import React from 'react';

const PlayerInput = ({ playerName, setPlayerName, addPlayer, startGame, gameStarted, players }) => {
  return (
    <div className="login-container">
      <h1 className="title">"משחק "לך אל ה-100</h1>
      {gameStarted === false ? (
        <>
          <h1 className="title"> כניסה ורישום</h1>
          <input
            key="usernameInput"
            type="text"
            placeholder="שם משתמש"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={() => addPlayer(playerName)}>כניסה</button>
          <br />
          <button onClick={() => startGame()}>התחל משחק</button>
          <h3 className="title">נכנסו למשחק {players.length} </h3>
        </>
      ) : null}
    </div>
  );
};

export default PlayerInput;
