import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [targetDate, setTargetDate] = useState("");
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timerMessage, setTimerMessage] = useState("");

  const handleInputChange = (e) => {
    setTargetDate(e.target.value);
    // Clear timer message when the user selects a new time
    setTimerMessage("");
  };

  const startCountdown = () => {
    // Clear previous interval if exists
    clearInterval(intervalId);

    if (targetDate) {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (
        !timerMessage &&
        distance > 0 &&
        distance <= 100 * 24 * 60 * 60 * 1000
      ) {
        setRemainingTime(calculateRemainingTime(distance));
        setCountdownStarted(true);

        const id = setInterval(() => {
          const now = new Date().getTime();
          const newDistance = targetTime - now;

          if (newDistance > 0) {
            setRemainingTime(calculateRemainingTime(newDistance));
          } else {
            clearInterval(id); // Clear the interval when countdown is over
            setCountdownStarted(false);
            setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setTimerMessage(
              "🎉 The countdown is over! What's next on your adventures? 🎉"
            );
          }
        }, 1000);

        setIntervalId(id); // Update intervalId state with the new interval ID
      } else {
        setTimerMessage("Selected time is more than 100 days.");
      }
    }
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
    setCountdownStarted(false);
    setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setTimerMessage("");
  };

  const calculateRemainingTime = (distance) => {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  return (
    <>
      <header className="container">
        <h1>
          Countdown <span className="head1">Timer</span>
        </h1>
        <input
          className="input1"
          type="datetime-local"
          value={targetDate}
          onChange={handleInputChange}
          step="60"
        />
        {!countdownStarted ? (
          <>
            <br />
            <button className="input1" onClick={startCountdown}>
              Start Timer
            </button>
          </>
        ) : (
          <>
            <br />
            <button className="input1" onClick={stopCountdown}>
              Cancel Timer
            </button>
          </>
        )}
        {!timerMessage &&
          remainingTime.days <= 100 && ( // Conditionally render the boxes only when timerMessage is empty and remaining days is less than or equal to 100
            <div className="box">
              <div className="box1">
                <div className="item1">
                  <span className="head2">{remainingTime.days}</span>
                  <span className="head3">Days</span>{" "}
                </div>
              </div>
              <div className="box1">
                <div className="item1">
                  <span className="head2">{remainingTime.hours}</span>
                  <span className="head3">Hours</span>
                </div>
              </div>
              <div className="box1">
                <div className="item1">
                  <span className="head2">{remainingTime.minutes}</span>
                  <span className="head3">Minutes</span>
                </div>
              </div>
              <div className="box1">
                <div className="item1">
                  <span className="head2">{remainingTime.seconds}</span>
                  <span className="head3">Seconds</span>
                </div>
              </div>
            </div>
          )}
        <div className="msg">{timerMessage}</div>
      </header>
    </>
  );
};

export default App;
