import { useState, useEffect } from "react";
import Board from "../Board";
import Error from "../Error";
import Help from "../Help";
import KeyBoard from "../KeyBoard";
import Modal from "../Modal";
import NavBar from "../NavBar";
import styles from "./style.module.css";

function Game(props) {
  const [letter, setletter] = useState();
  const [changed, setChanged] = useState(false);
  const [letters, setLetters] = useState({});
  const [help, setHelp] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    props.darkness(dark);
  }, [dark])

  const keyHandler = (letterValue) => {
    setletter(letterValue);
    setClicked(clicked + 1);
  };
  const LettersHandler = (lettersValue) => {
    setLetters(lettersValue);
    setChanged(!changed);
  };
  return (
    <>
      {help && <Modal title="How to play!" help={setHelp}> <Help /> </Modal>}
      {error && <Error>{error}</Error>}
      <div className={styles.game}>
        <NavBar help={setHelp} darkness={setDark} dark={dark} />
        <hr />
        <Board letter={letter} clicks={clicked} letters={LettersHandler} error={setError}/>
        <KeyBoard keyHandler={keyHandler} letters={letters} changed={changed} />
      </div>
    </>
  );
}

export default Game;