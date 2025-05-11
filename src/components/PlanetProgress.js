const PlanetProgress = ({ progress, color, background, image }) => (
  <>
    <div
      className="planet"
      style={{
        backgroundImage: image,
        maxWidth: '100%',
        width: '850px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
    <div className="progress progress-striped">
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          backgroundImage: background,
          transition: 'width 0.5s ease',
        }}
      />
    </div>
  </>
);

export default PlanetProgress;
