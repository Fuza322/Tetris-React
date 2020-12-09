import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import Redirect  from "react-router-dom/es/Redirect";

const Tetris = (props) => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, goal, setGoal, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );



  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };


  const startGame = () => {
    // Reset everything
    let xhr2 = new XMLHttpRequest()
    xhr2.addEventListener('load', () => {
      props.setBalanceValue(xhr2.responseText);
      console.log(xhr2.responseText);
    })
    let request = 'http://localhost:8080/api/balance?address='+props.walletName;
    xhr2.open('GET', request);
    xhr2.send();
    setStage(createStage());
    setDropTime(1000);
    props.setSolve('');
    resetPlayer();
      /*let xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
        setScore(JSON.parse(xhr.responseText)["fee"])
      })
      xhr.open('GET', 'http://localhost:8080/api/transaction?hash=KEK')
      xhr.send()*/
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const downGoal = () => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      setGoal(xhr.responseText);
    })
    xhr.open('GET', 'http://localhost:8080/api/goal')
    xhr.send()
  }

  function createNewBlock(){
    let xhr = new XMLHttpRequest()
         xhr.addEventListener('load', () => {
           let json = JSON.parse(xhr.responseText);
           //json.solution = props.solve;
           let jsonString = JSON.stringify(json);
           let hexstr = '';
           const input = new TextEncoder('utf-8').encode(jsonString);
           console.log(input);
           crypto.subtle.digest('SHA-256', input)
               .then(function(digest) {
                 let view = new DataView(digest);
                 let hexstr = '';
                 for(let i = 0; i < view.byteLength; i++) {
                   let b = view.getUint8(i);
                   hexstr += '0123456789abcdef'[(b & 0xf0) >> 4];
                   hexstr += '0123456789abcdef'[(b & 0x0f)];
                 }
                 console.log(hexstr);

                 json.blockHeader.hash = hexstr;
                 console.log(JSON.stringify(json));

                 let xhr2 = new XMLHttpRequest();
                 xhr2.open("POST", 'http://localhost:8080/api/block/push', true);
                 xhr2.setRequestHeader('Content-Type', 'application/json');
                 xhr2.setRequestHeader('Access-Control-Allow-Origin', '*');
                 let bod = JSON.stringify(json);
                 xhr2.send(bod);
                 console.log(JSON.stringify(json));

                 xhr2 = new XMLHttpRequest()
                 xhr2.addEventListener('load', () => {
                   props.setBalanceValue(xhr2.responseText);
                   console.log(xhr2.responseText);
                 })
                 let request = 'http://localhost:8080/api/balance?address='+props.walletName;
                 xhr2.open('GET', request);
                 xhr2.send();


               })
               .catch(function(err) {
                 console.error(err);
               });
           console.log(json);
         })
         xhr.open('GET', 'http://localhost:8080/api/block/prepared?miner=' + props.walletName);
         xhr.send()
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        if (score >= parseInt(goal))
          createNewBlock(props.solve);
        console.log(score >= parseInt(goal));
        console.log(parseInt(goal));

        setGameOver(true);
        setDropTime(null);
      }else {
        const tetrominos = 'IJLOSTZ';
        props.setSolve(props.solve + (" " + (player.pos.x + 1).toString() + " " + player.pos.y.toString() + " " + player.rot.toString() + " " + tetrominos[Math.floor(Math.random() * tetrominos.length)]));
        console.log(props.solve);
        updatePlayerPos({x: 0, y: 0, collided: true});
      }
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  useInterval(() => {
    downGoal();
  }, 1000);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  if (!props.authorized) return <Redirect to={'/generate-wallet'}/>
  else return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Goal: ${goal}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
