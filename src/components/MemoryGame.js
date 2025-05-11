import React, { useState, useEffect } from 'react';
import materials from '../materials';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import PlanetProgress from './PlanetProgress';
import TrashList from './TrashList';

const trash = [
  { name: 'organic', label: 'Orgânico' },
  { name: 'metal', label: 'Metal' },
  { name: 'paper', label: 'Papel' },
  { name: 'glass', label: 'Vidro' }
];

const shuffleMaterials = () => {
  return [...materials].sort(() => (Math.random() > 0.5 ? 1 : -1));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleMaterials());
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [trashCount, setTrashCount] = useState(() => {
    const initial = {};
    trash.forEach(t => { initial[t.name] = 0; });
    return initial;
  });

  const handleCardClick = (index) => {
    if (openedCards.length < 2 && !openedCards.includes(index) && !matchedCards.includes(index)) {
      setOpenedCards(prev => [...prev, index]);
    }
  };

  useEffect(() => {
    if (openedCards.length === 2) {
      const [i1, i2] = openedCards;
      const card1 = cards[i1];
      const card2 = cards[i2];
      setAttempts(prev => prev + 1);

      if (card1.name === card2.name) {
        setMatchedCards(prev => [...prev, i1, i2]);
        setScore(prev => prev + 12.5);
        setTrashCount(prev => ({
          ...prev,
          [card1.type]: prev[card1.type] + 1
        }));
      } else {
        setScore(prev => Math.max(prev - 5, 0));
      }

      setTimeout(() => setOpenedCards([]), 500);
    }
  }, [openedCards, cards]);

  const resetGame = () => {
    setCards(shuffleMaterials());
    setOpenedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setScore(0);
    setTrashCount(() => {
      const initial = {};
      trash.forEach(t => { initial[t.name] = 0; });
      return initial;
    });
  };

  const maxScore = 100;
  const progress = Math.min((score / maxScore) * 100, 100);
  let progressColor = '', backgroundImage = '', progressBackground = '';

  if (progress <= 33) {
    progressColor = '#565757';
    progressBackground = `linear-gradient(45deg, rgba(59, 60, 60, 0.8) 25%, transparent 25%, transparent 50%, rgba(59, 60, 60, 0.8) 50%, rgba(59, 60, 60, 0.8) 75%, transparent 75%, transparent)`;
    backgroundImage = 'url("/poluido.png")';
  } else if (progress <= 66) {
    progressColor = '#21776dcc';
    progressBackground = `linear-gradient(45deg, rgba(55, 196, 180, 0.8) 25%, transparent 25%, transparent 50%, rgba(55, 196, 180, 0.8) 50%, rgba(55, 196, 180, 0.8) 75%, transparent 75%, transparent)`;
    backgroundImage = 'url("/ameno.png")';
  } else {
    progressColor = '#0b9ec3cc';
    progressBackground = `linear-gradient(45deg, rgba(7, 200, 249, 0.8) 25%, transparent 25%, transparent 50%, rgba(7, 200, 249, 0.8) 50%, rgba(7, 200, 249, 0.8) 75%, transparent 75%, transparent)`;
    backgroundImage = 'url("/limpo.png")';
  }

  return (
    <div className="container">
      <div className="content-container" style={{ backgroundColor: progressColor }}>
        <div className="game">
          <h2>Jogo da Sustentabilidade</h2>
          {cards.map((card, index) => (
            <Card
              key={index}
              index={index}
              card={card}
              isOpen={openedCards.includes(index)}
              isMatched={matchedCards.includes(index)}
              onClick={handleCardClick}
            />
          ))}
          <ScoreBoard score={score} attempts={attempts} onReset={resetGame} />

        </div>
        <div className="trash">
          <PlanetProgress
            progress={progress}
            color={progressColor}
            background={progressBackground}
            image={backgroundImage}
          />
          <TrashList trash={trash} trashCount={trashCount} />
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
