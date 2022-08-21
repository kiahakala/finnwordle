import { useState, useEffect } from "react"
import Board from "../Board/Board"
import Error from "../Error/Error"
import Help from "../Help/Help"
import Lock from "../Lock/Lock"
import KeyBoard from "../KeyBoard/Keyboard"
import Modal from "../Modal/Modal"
import LockModal from "../Modal/LockModal"
import NavBar from "../NavBar/Navbar"
import styles from "./style.module.css"

function Game (props) {

  const [letter, setLetter] = useState()
  const [changed, setChanged] = useState(false)
  const [letters, setLetters] = useState({})
  const [help, setHelp] = useState(false)
  const [lock, setLock] = useState(false)
  const [clicked, setClicked] = useState(0)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)
  

  const onClickDown = (event) => {
    if (event.key === "Enter") {
      setLetter("ENTER")
      setClicked(clicked + 1)
    } else if (event.key === "Backspace") {
      setLetter("DEL")
      setClicked(clicked + 1)
    } else if ("abcdefghijklmnopqrstuvwxyzäö".includes(event.key.toLowerCase())) {
      setLetter(event.key.toUpperCase())
      setClicked(clicked + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onClickDown)
    return () => window.removeEventListener("keydown", onClickDown)
  })

  useEffect(() => {
    props.darkness(dark)
  }, [dark])

  const keyHandler = (letterValue) => {
    setLetter(letterValue)
    setClicked(clicked + 1)
  }
  const LettersHandler = (lettersValue) => {
    setLetters(lettersValue)
    setChanged(!changed)
  }

  return (
    <>
      {help && (
        <Modal title="Ohjeet" help={setHelp}>
          {" "}
          <Help />{" "}
        </Modal>
      )}
      {lock && (
        <LockModal title="Peli lukittu">
          {" "}
          <Lock />
          {" "}
        </LockModal>
      )}
      {error && <Error>{error}</Error>}
      <div className={styles.game}>
        <NavBar help={setHelp} darkness={setDark} dark={dark} />
        <hr />
        <Board
          letter={letter}
          clicks={clicked}
          letters={LettersHandler}
          error={setError}
          lock={setLock}
        />
        <KeyBoard keyHandler={keyHandler} letters={letters} changed={changed} />
      </div>
    </>
  )
}

export default Game
