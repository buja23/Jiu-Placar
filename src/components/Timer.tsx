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
    // Adicionado 'relative' para o posicionamento correto do pop-up de configurações
    <div className="bg-card rounded-xl p-4 border border-border shadow-elegant relative">
      {/* Alterado de 'flex items-center justify-between' para 'flex flex-col items-center' */}
      <div className="flex flex-col items-center gap-4">
        
        {/* Controls (AGORA EM CIMA) */}
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

        {/* Timer Display (AGORA EM BAIXO) */}
        
        {/* Removido 'flex-1' para centralizar corretamente na coluna */}
        <div className="text-center">
          {/* MUDANÇA AQUI: 
            Removi "timer-display" e adicionei classes de tamanho e sombra.
          */}
          <div className={`text-7xl md:text-8xl font-black tracking-tight drop-shadow-lg ${timeInSeconds <= 10 && timeInSeconds > 0 ? 'text-destructive animate-pulse' : ''}`}>
            {formatTime(timeInSeconds)}
          </div>
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

