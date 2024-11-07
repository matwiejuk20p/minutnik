import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = 0;
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (isActive && minutes === 0 && seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startTimer = (e) => {
    e.preventDefault();
    setMinutes(parseInt(initialMinutes));
    setSeconds(parseInt(initialSeconds));
    setIsActive(true);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 w-100">
      <div className="text-center bg-light p-4 rounded shadow">
        <h1 className="display-4">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <p className="lead">Pozostały czas</p>

        {!isActive && (
          <form onSubmit={startTimer}>
            <div className="form-group">
              <label>Minuty:</label>
              <input
                type="number"
                className="form-control"
                value={initialMinutes}
                onChange={(e) => setInitialMinutes(e.target.value)}
                min="0"
              />
            </div>
            <div className="form-group mt-2">
              <label>Sekundy:</label>
              <input
                type="number"
                className="form-control"
                value={initialSeconds}
                onChange={(e) => setInitialSeconds(e.target.value)}
                min="0"
                max="59"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
