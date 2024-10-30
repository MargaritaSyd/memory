import { useState } from "react";
import { MemoryCards } from "../components/Card/MemoryCards";

import winner from "../assets/winner.gif";
import imageGame1 from "../assets/planet-game1.png";
import imageGame2 from "../assets/planet-game2.png";
import imageGame3 from "../assets/planet-game3.png";
import imageGame4 from "../assets/planet-game4.png";
import imageGame5 from "../assets/planet-game5.png";
import imageGame6 from "../assets/planet-game6.png";

import { useEffect } from "react";

const cardImages = [
  {"src": imageGame1, matched: false},
  {"src": imageGame2, matched: false},
  {"src": imageGame3, matched: false},
  {"src": imageGame4, matched: false},
  {"src": imageGame5, matched: false},
  {"src": imageGame6, matched: false}
]

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards);
    setTurns(0);
    setWon(false);
  }

  const handleChoice = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        choiceOne.matched = true
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true}
            }
            return card
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1500);
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    const matches = cards.map((card) => card.matched)
    if (matches.length > 0 && !matches.includes(false)){
      setTimeout(() => setWon(true), 1000);
    }
  }, [cards]);
  return (
    <div className="App">
      <h1>Space Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h2>{`Your turns: ${turns}`}</h2>
      <div className={`card ${won ? "flipped" : ""}`}>
        <div className='card-grid front'>
        {
          cards.map((card) => {
            return (
              <MemoryCards
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
          )})
        }
        </div>
        <div className='back winner-text'>
          <h1 style={{ position: "absolute" }}>You did it!</h1>
          <img className="winner-image" src={winner} alt="winner"/>
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;
