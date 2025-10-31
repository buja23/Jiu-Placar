import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

export const Timer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(300); // 5 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("5");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    const minutes = parseInt(inputMinutes) || 5;
    setTimeInSeconds(minutes * 60);
  };

  const handleSetTime = () => {
    const minutes = parseInt(inputMinutes) || 5;
    setTimeInSeconds(minutes * 60);
    setIsRunning(false);
    setShowSettings(false);
  };

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-elegant">
      <div className="flex items-center justify-between gap-4">
        {/* Timer Display */}
        <div className="flex-1 text-center">
          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
            Cronômetro
          </p>
          <div className={`timer-display ${timeInSeconds <= 10 && timeInSeconds > 0 ? 'text-destructive animate-pulse' : ''}`}>
            {formatTime(timeInSeconds)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            className={`rounded-full h-12 w-12 ${
              isRunning 
                ? "bg-destructive hover:bg-destructive/90" 
                : "athlete-blue-bg hover:opacity-90"
            }`}
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="rounded-full h-12 w-12"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-full h-12 w-12"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Time Settings */}
        {showSettings && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-card rounded-xl p-3 border border-border shadow-elegant z-10">
            <label className="text-xs font-semibold text-foreground mb-2 block">
              Definir Tempo (minutos)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max="60"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="flex-1 h-9"
                placeholder="5"
              />
              <Button onClick={handleSetTime} className="athlete-blue-bg h-9">
                Aplicar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
