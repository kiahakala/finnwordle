import { useEffect, useState } from 'react'
import Box from '../Box/Box'
import words from '../../words'

let defaulBoard = []
let defaultLetters = []

'abcdefghijklmnopqrstuvwxyzäö'.split('').forEach((i) => {
  defaultLetters[i] = ''
})

for (let i = 0; i < 6; i++) {
  defaulBoard.push([])
  for (let j = 0; j < 5; j++) {
    defaulBoard[i].push(['', ''])
  }
}

const Board = (props) => {

  const storedValueAsString = String(localStorage.getItem('word'))
  const storedTime = localStorage.getItem('time')


  const [correctW, setCorrectW] = useState(storedValueAsString ? storedValueAsString : '')
  const [letters, setLetters] = useState(defaultLetters)
  const [board, setBoard] = useState(defaulBoard)
  const [changed, setChanged] = useState(false)
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)
  const [win, setWin] = useState(false)
  const [lost, setLost] = useState(false)
  const [message, setMessage] = useState('')
  const [update, setUpdate] = useState(false)
  const [time, setTime] = useState(storedTime)


  useEffect(() => {
    if (update) {
      localStorage.setItem('word', correctW)
      setUpdate(false)
    }
  }, [correctW, update]) 

  useEffect(() => {
    if (time > 0 && setUpdate(true)) {
      props.lock(true)
    }
  }, [time, props]) 

  useEffect(() => {
    let interval
      interval = setInterval(() => {
      setUpdate(true)
      setCorrectW(words[Math.floor(Math.random() * words.length)].toUpperCase())
      console.log('In setInterval', correctW)
      }, 86400000)
      //86400000
     return () => clearInterval(interval)
  }, [correctW]) 

  useEffect(() => {
    if (win || lost) {
      console.log('Peli päättyi!')
    } else {
      if (props.clicks !== 0) {
        if (props.letter === 'DEL') {
          setCol(col === 0 ? 0 : col - 1)
          setBoard((prevBoard) => {
            prevBoard[row][col === 0 ? 0 : col - 1][0] = ''
            return prevBoard
          })
        } else {
          setBoard((prevBoard) => {
            if (col < 5) {
              if (props.letter !== 'ENTER') {
                prevBoard[row][col][0] = props.letter
                setCol(col + 1)
              } else {
                props.error('Sanassa täytyy olla 5 kirjainta!')
                setTimeout(() => {
                  props.error('')
                }, 10000)
                props.lock(true)
              }
            } else {
              if (props.letter === 'ENTER') {
                let correctLetters = 0
                let word = ''
                for (let i = 0; i < 5; i++) {
                  word += prevBoard[row][i][0]
                }
                //Jos words sisältää syötetyn sanan, lisätään correctLettersiin + 1
                if (words.includes(word.toLowerCase())) {
                  for (let i = 0; i < 5; i++) {
                    if (correctW[i] === prevBoard[row][i][0]) {
                      prevBoard[row][i][1] = 'C'
                      correctLetters++
                      //Jos syötetty sana sisältää oikean kirjaimen, se näkyy oranssina
                    } else if (correctW.includes(prevBoard[row][i][0])) 
                      prevBoard[row][i][1] = 'E'
                    //Muuten rivi on harmaa
                    else prevBoard[row][i][1] = 'N'
                    setRow(row + 1)
                    //Jos row on 5 eli ruudukko täynnä ilman oikeaa sanaa, peli loppuu häviöön
                    if (row === 5) {
                      setLost(true)
                      setTimeout(() => {
                        setMessage(`Sana oli ${correctW}`)
                      }, 750)
                    }

                    setCol(0)
                    setLetters((prev) => {
                      prev[board[row][i][0]] = board[row][i][1]
                      return prev
                    })
                  }
                  setChanged(!changed)

                  if (correctLetters === 5) {
                    setWin(true)
                    setTimeout(() => {
                      setMessage('VOITIT!')
                    }, 750)
                  }
                  return prevBoard
                } else {
                  props.error('Sana ei ole sanakirjassa')
                  setTimeout(() => {
                    props.error('')
                  }, 1000)
                }
              }
            }
            return prevBoard
          })
        }
      }
    }
  }, [props.clicks])

  useEffect(() => {
    props.letters(letters)
  }, [changed])

  return (
    <div className='px-10 py-5 grid gap-y-1 items-center w-100 justify-center'>
      {board.map((row, key) => {
        return (
          <div key={key} className='flex gap-1 w-fit'>
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        )
      })}
      <div className=' grid place-items-center h-8 font-bold dark:text-white'>
        {lost||win ? message : ''}
      </div>
    </div>
  )
}

export default Board
