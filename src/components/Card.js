const Card = ({ index, card, isOpen, isMatched, onClick }) => {
  const className = `item ${isOpen ? 'boxOpen' : ''} ${isMatched ? 'boxMatch' : ''}`;
  return (
    <div className={className} onClick={() => onClick(index)}>
      {isOpen || isMatched ? card.name : ''}
    </div>
  );
};

export default Card;