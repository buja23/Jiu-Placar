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
    <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant">
      <div className="flex flex-col items-center gap-6">
        {/* Timer Display */}
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Cronômetro
          </p>
          <div className={`timer-display ${timeInSeconds <= 10 && timeInSeconds > 0 ? 'text-destructive animate-pulse' : ''}`}>
            {formatTime(timeInSeconds)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            onClick={() => setIsRunning(!isRunning)}
            className={`rounded-full h-16 w-16 ${
              isRunning 
                ? "bg-destructive hover:bg-destructive/90" 
                : "athlete-blue-bg hover:opacity-90"
            }`}
          >
            {isRunning ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleReset}
            className="rounded-full h-16 w-16"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-full h-16 w-16"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        {/* Time Settings */}
        {showSettings && (
          <div className="w-full max-w-xs bg-secondary/50 rounded-xl p-4 border border-border backdrop-blur-sm">
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Definir Tempo (minutos)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max="60"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="flex-1"
                placeholder="5"
              />
              <Button onClick={handleSetTime} className="athlete-blue-bg">
                Aplicar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
