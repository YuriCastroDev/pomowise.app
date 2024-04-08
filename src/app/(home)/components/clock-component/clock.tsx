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

    const playAlarmSong = () => {
      const alarmAudio = new Audio("/alarm_clock.mp3");
      alarmAudio.play();
    };

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isRunning && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      } else if (timeLeft <= 0) {
        playAlarmSong();
        nextStatus();
      }

      document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - ${currentStatusIndex === 0 ? 'Focus' : currentStatusIndex === 1 ? 'Short Break' : 'Long Break'}`;

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
            <div className="flex statuses-gap">
              <span className={`clock-title ${currentStatusIndex === 0 ? 'active' : ''}`}>Focus</span>
              <span className={`clock-title ${currentStatusIndex === 1 ? 'active' : ''}`}>Short Break</span>
              <span className={`clock-title ${currentStatusIndex === 2 ? 'active' : ''}`}>Long Break</span>
            </div>
            <div className="flex items-center space-x-2 clock-background">
                <div className="flex flex-col justify-center items-center clock-container">
                    <span className="minutes-seconds-number">{minutes < 10 ? `0${minutes}` : minutes}</span>
                    <span className="minutes-seconds-text">Minutes</span>
                </div>
                <div className="flex flex-col justify-center items-center clock-container">
                    <span className="minutes-seconds-number">{seconds < 10 ? `0${seconds}` : seconds}</span>
                    <span className="minutes-seconds-text">Seconds</span>
                </div>
            </div>
                {!isRunning ? (
                <button className="clock-button" onClick={startTimer}>START</button>
                ) : (
                  <div className="flex gap-8">
                    <button className="clock-button ml-16" onClick={pauseTimer}>PAUSE</button>
                    <button onClick={nextStatus}><SkipForward size={32} color="white" weight="bold"/></button>
                  </div>
                )}
        </div>
    );
};

export default Clock;
