import React, { useState } from 'react';
import { sortBy } from 'lodash';
import './Play.css';

const Game = () => {
  const [players, setPlayers] = useState([]);  //מערך שחקנים
  const [allPlayers, setAllPlayers] = useState([]);
  const [turn, setTurn] = useState(0);  //התור של..
  const [gameStarted, setGameStarted] = useState(false); // הוספת סטייט לצורך הבדיקה האם המשחק התחיל
  const [playerName, setPlayerName] = useState(''); //  משתנה playerName
  const targetMum = 8;
  const [counter, setcounter] = useState(0);
  const [idAll, setidAll] = useState(0);


  const addPlayer = (nameP) => {
    // בדיקה האם השחקן כבר קיים
    const existingPlayer = players.find((player) => player.name === nameP);

    if (existingPlayer) {   // אם קיים
      existingPlayer.point = Math.floor(Math.random() * targetMum) + 1;
      alert('שחקן כבר נכנס');
      return;
    }
    if (nameP === '') {//בדיקה שהוקלד השם בשדה
      return;
    }

    const existingPlayerAll = allPlayers.find((player) => player.nameP === nameP);
    console.log(existingPlayerAll)
    if (existingPlayerAll === undefined) {
      // שחקן חדש
      const newPlayer = {
        idAll: idAll,
        id: players.length, // מספר מזהה לשחקן
        name: nameP, // שם השחקן
        point: Math.floor(Math.random() * targetMum), // קביעת מספר רנדומאלי לתחילת המשחק
        numOfOperation: 0, // מספר הפעולות שביצע במשחק הנוכחי
      };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]); // הוספת השחקן החדש למערך השחקנים
      setPlayerName('');

      setidAll(idAll + 1);

      const memoryPlayer = {
        idAll: 0,
        nameP: nameP,
        plays: 1, // מספר המשחקים ששיחק
        numOfAllOperation: 0, // מספר הפעולות שביצע בכלל משחקיו
      }
      setAllPlayers((prevPlayers) => [...prevPlayers, memoryPlayer]);
    }
    else {
      console.log("llllll")
      const index = allPlayers.indexOf(existingPlayerAll);
      const newPlayer = {
        idAll: allPlayers[index].idAll,
        id: players.length, // מספר מזהה לשחקן
        name: nameP, // שם השחקן
        point: Math.floor(Math.random() * targetMum), // קביעת מספר רנדומאלי לתחילת המשחק
        numOfOperation: 0, // מספר הפעולות שביצע במשחק הנוכחי
      };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]); // הוספת השחקן החדש למערך השחקנים
      setPlayerName('');
      console.log(existingPlayerAll.plays, 55555)

      existingPlayerAll.plays += 1;
    }
  };


  const startGame = () => {   // מצב משחק פעיל
    setGameStarted(true);
  };

  const [wowMessage, setwowMessage] = useState("");

  const handleMove = (operation) => {             //  פעולת שחקן במשחק
    checkPlayers();
    const updatedPlayers = [...players];
    updatedPlayers[turn].point = applyOperation(players[turn].point, operation);
    updatedPlayers[turn].numOfOperation += 1;
    allPlayers.find((player) => player.nameP === players[turn].name).numOfAllOperation += 1;
    console.log(3000, turn, players[turn].point);
    setPlayers(updatedPlayers);
    if (players[turn].point === targetMum) {
      console.log(96);
      const winningPlayer = updatedPlayers[turn];
      //   setwow(true);
      console.log(100, counter);
      setcounter(counter + 1);

      console.log(200, counter);
      <div>setwowMessage(`השחקן ${winningPlayer.name} סיים `);</div>
      if (counter === players.length - 1) {
        alert("סיום");
        newGame();
      }

    }
    updateTurn();
    checkPlayers();
    console.log(30, turn);
  };

  const updateTurn = () => {


    if (turn === players.length - 1) {
      console.log(10, turn);
      setTurn(0);
    } else {
      console.log(30, turn);
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

  const applyOperation = (number, operation) => {  //חישוב וקביעת המספר ע"י השחקן   
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
    players.map((player) => (
      <div key={player.id}></div>
    ))
  }

  const sortedPlayers = sortBy(allPlayers, (player) => player.numOfAllOperation / player.plays);
  const lowestAveragePlayers = sortedPlayers.slice(0, 3);

  return (
    <>
      <div className="login-container">
        <h1 className="title">"משחק "לך אל ה-100</h1>
  
        {gameStarted === false ? (  // טרום משחק
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
        ) : (  // מצב משחק
          <>
            <div className="title">כעת התור של {turn + 1}  </div>
            <div className="player-container">
              {players.map((player) => (    //מעביר התור משחקן לשחקן
                player.point !== targetMum && (
                  <div className="background" key={player.id}>
                    <h2 className="message">שם השחקן: {player.name}    </h2>
                    <h6> מספר שחקן במשחק הנוכחי : {player.id + 1}</h6>
                    <h6> מספר מזהה עבור כל המשחקים : {player.idAll + 1}</h6>
                    <h3 className="message">  <b>{player.point}</b>   :המספר שלך כעת   </h3>
                    <h4 className="message">   מספר פעולות: <b>{player.numOfOperation}</b>   </h4>
                    {checkPlayers()}
                    {turn === player.id ? (    // הפונקציונליות למי שכעת התור שלו
                      <div className="button-container">
                        <div>התור שלך</div>
  
                        <button
                          id={`player${player.id}-button`}
                          className="button"
                          onClick={() => handleMove('divide')}
                        >
                          חלק ב-2
                        </button>
                        <button
                          id="player1-button"
                          className="button"
                          onClick={() => handleMove('multiply')}
                        >
                          הכפל ב-2
                        </button>
                        <button
                          id="player1-button"
                          className="button"
                          onClick={() => handleMove('subtract')}
                        >
                          החסר 1
                        </button>
                        <button
                          id="player1-button"
                          className="button"
                          onClick={() => handleMove('add')}
                        >
                          הוסף 1
                        </button>
  
                      </div>
                    ) : (   // הפונקציונליות למי שממתין לתורו
                      <div className="button-container">....נא המתן לתורך</div>
                    )}
                  </div>
  
                )
              ))}
  
              <div className="players-board">
                <br></br>
                <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <h2 className="title">כל השחקנים</h2>
                    <ul>
                      {allPlayers.map((player) => (
                        <li key={player.idAll}>
                          {player.nameP}  <strong>שם השחקן</strong>
                          <br />
                          <strong>מספר משחקים ששיחק:</strong> {player.plays}
                          <br />
                          <strong>מספר הפעולות שביצע בכלל משחקיו:</strong> {player.numOfAllOperation}
                          <br />
                          <strong>ממוצע:</strong> {player.numOfAllOperation !== 0 ? Math.floor(player.plays / player.numOfAllOperation) : 'אין נתונים'}
                          <br />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='heppy'>
                    <h2>שחקנים מובילים</h2>
                    {lowestAveragePlayers.map((player, index) => (
                      <div key={index}>
                        {player.nameP}  <strong>שם השחקן</strong>
                        <br />
                        <strong>ממוצע:</strong> {player.numOfAllOperation !== 0 ? Math.floor(player.plays / player.numOfAllOperation) : 'אין נתונים'}
                        <br />
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {wowMessage && <p className="message">{wowMessage}</p>}
      </div>
    </>
  );
  
};

export default Game;
