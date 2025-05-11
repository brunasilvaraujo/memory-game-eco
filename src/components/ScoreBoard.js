const ScoreBoard = ({ score, attempts, onReset }) => (
  <div className="scoreboard">
    <p className="scores">Pontuação: {score}</p>
    <button className="reset" onClick={onReset}>Reiniciar</button>
    <p>Tentativas: {attempts}</p>
  </div>
);

export default ScoreBoard;