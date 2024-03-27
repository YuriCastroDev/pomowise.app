'use client'

import { useState, useEffect } from "react";
import { ComponentProps } from "react";
import "./clock.css";

const Clock = ({}: ComponentProps<"div">) => {
    const [timeLeft, setTimeLeft] = useState(1500); // 25 minutos em segundos
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      let timer: NodeJS.Timeout; // Definindo o tipo explicitamente
      if (isRunning && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      } else {
        setIsRunning(false);
      }
  
      return () => clearTimeout(timer);
    }, [isRunning, timeLeft]);
  
    const startTimer = () => {
      setIsRunning(true);
    };

    const pauseTimer = () => {
      setIsRunning(false);
    };
  
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return { minutes, seconds };
    };

    const { minutes, seconds } = formatTime(timeLeft);

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 clock-background">
                <div className="flex flex-col justify-center items-center clock-container">
                    <span className="text-8xl">{minutes < 10 ? `0${minutes}` : minutes}</span>
                    <span className="text-2xl">Minutes</span>
                </div>
                <div className="flex flex-col justify-center items-center clock-container">
                    <span className="text-8xl">{seconds < 10 ? `0${seconds}` : seconds}</span>
                    <span className="text-2xl">Seconds</span>
                </div>
            </div>
            <div>
                {!isRunning ? (
                <button className="clock-button" onClick={startTimer}>START</button>
                ) : (
                <button onClick={pauseTimer}>PAUSE</button>
                )}
            </div>
        </div>
    );
};

export default Clock;
