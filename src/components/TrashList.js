const TrashList = ({ trash, trashCount }) => (
  <div className="trash-list">
    {trash.map((type) => (
      <div key={type.name} className="trash-box">
        <img
          src={`/${type.name}.png`}
          alt={`Lixeira de ${type.label}`}
          className="trash-icon"
        />
        <div className="progress-bar-container">
          <p className="trash-title">{type.label}</p>
          <p className="trash-count">{trashCount[type.name]} material(is) coletado(s)</p>
        </div>
      </div>
    ))}
  </div>
);

export default TrashList;
