// PlayerGame.js
import React from 'react';

const PlayerGame = ({ players, turn, handleMove, checkPlayers, newGame, wowMessage, allPlayers, sortedPlayers, lowestAveragePlayers }) => {
  return (
    <>
      <div className="title">כעת התור של {turn + 1}</div>
      <div className="player-container">
        {players.map((player) => (
          player.point !== 8 && (
            <div className="background" key={player.id}>
              <h2 className="message">שם השחקן: {player.name}</h2>
              <h6>מספר שחקן במשחק הנוכחי: {player.id + 1}</h6>
              <h6>מספר מזהה עבור כל המשחקים: {player.idAll + 1}</h6>
              <h3 className="message">
                <b>{player.point}</b> :המספר שלך כעת
              </h3>
              <h4 className="message">
                מספר פעולות: <b>{player.numOfOperation}</b>
              </h4>
              {checkPlayers()}
              {turn === player.id ? (
                <div className="button-container">
                  <div>התור שלך</div>

                  <button id={`player${player.id}-button`} className="button" onClick={() => handleMove('divide')}>
                    חלק ב-2
                  </button>
                  <button id="player1-button" className="button" onClick={() => handleMove('multiply')}>
                    הכפל ב-2
                  </button>
                  <button id="player1-button" className="button" onClick={() => handleMove('subtract')}>
                    החסר 1
                  </button>
                  <button id="player1-button" className="button" onClick={() => handleMove('add')}>
                    הוסף 1
                  </button>
                </div>
              ) : (
                <div className="button-container">....נא המתן לתורך</div>
              )}
            </div>
          )
        ))}

        <div className="players-board">
          <br />
          <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <h2 className="title">כל השחקנים</h2>
              <ul>
                {allPlayers.map((player) => (
                  <li key={player.idAll}>
                    {player.nameP} <strong>שם השחקן</strong>
                    <br />
                    <strong>מספר משחקים ששיחק:</strong> {player.plays}
                    <br />
                    <strong>מספר הפעולות שביצע בכלל משחקיו:</strong> {player.numOfAllOperation}
                    <br />
                    <strong>ממוצע:</strong>{' '}
                    {player.numOfAllOperation !== 0 ? Math.floor(player.plays / player.numOfAllOperation) : 'אין נתונים'}
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <div className="heppy">
              <h2>שחקנים מובילים</h2>
              {lowestAveragePlayers.map((player, index) => (
                <div key={index}>
                  {player.nameP} <strong>שם השחקן</strong>
                  <br />
                  <strong>ממוצע:</strong>{' '}
                  {player.numOfAllOperation !== 0 ? Math.floor(player.plays / player.numOfAllOperation) : 'אין נתונים'}
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {wowMessage && <p className="message">{wowMessage}</p>}
    </>
  );
};

export default PlayerGame;
