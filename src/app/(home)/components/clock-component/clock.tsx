'use client'
import { SkipForward } from "@phosphor-icons/react";

import { useState, useEffect } from "react";
import { ComponentProps } from "react";
import "./clock.css";

const Clock = ({}: ComponentProps<"div">) => {
    const durations = [25 * 60, 5 * 60, 15 * 60];
    const sequence = [0, 1, 0, 1, 0, 1, 0, 2];
  
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(sequence[sequenceIndex]);
    const [timeLeft, setTimeLeft] = useState(durations[currentStatusIndex]);
    const [isRunning, setIsRunning] = useState(false);
  
    const nextStatus = () => {
      setIsRunning(false);
      setSequenceIndex((prevIndex) => (prevIndex + 1) % sequence.length);
      const nextIndex = (sequenceIndex + 1) % sequence.length;
      const nextStatusIndex = sequence[nextIndex];
      setCurrentStatusIndex(nextStatusIndex);
      setTimeLeft(durations[nextStatusIndex]);
    };

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isRunning && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      } else if (timeLeft < 0){
        nextStatus();
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
        <div className="flex flex-col items-center clock-outside">
            <div className="flex gap-8">
              <span className={`clock-title ${currentStatusIndex === 0 ? 'active' : ''}`}>Focus</span>
              <span className={`clock-title ${currentStatusIndex === 1 ? 'active' : ''}`}>Short Break</span>
              <span className={`clock-title ${currentStatusIndex === 2 ? 'active' : ''}`}>Long Break</span>
            </div>
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
                  <div className="flex">
                    <button className="clock-button" onClick={pauseTimer}>PAUSE</button>
                    <button onClick={nextStatus}><SkipForward size={32} color="white" weight="bold"/></button>
                  </div>
                )}
            </div>
        </div>
    );
};

export default Clock;
