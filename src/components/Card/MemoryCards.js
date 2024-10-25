
import bird from "../../assets/bird.png";

import './MemoryCard.css'

export const MemoryCards = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  console.log(flipped)
  return (
    <div className='card'>
      <div className={!flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          src={bird}
          alt='card back'
          onClick={handleClick}
        />
      </div>
    </div>
  )
}