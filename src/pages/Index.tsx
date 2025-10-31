import { useState } from "react";
import { Timer } from "@/components/Timer";
import { AthleteScore } from "@/components/AthleteScore";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ScoreState {
  total: number;
  advantage: number;
  penalty: number;
  mount: number;
  guardPass: number;
  takedown: number;
  kneeOnBelly: number;
}

const Index = () => {
  const [blueScore, setBlueScore] = useState<ScoreState>({
    total: 0,
    advantage: 0,
    penalty: 0,
    mount: 0,
    guardPass: 0,
    takedown: 0,
    kneeOnBelly: 0,
  });

  const [redScore, setRedScore] = useState<ScoreState>({
    total: 0,
    advantage: 0,
    penalty: 0,
    mount: 0,
    guardPass: 0,
    takedown: 0,
    kneeOnBelly: 0,
  });

  const handleScoreChange = (
    athlete: "blue" | "red",
    type: keyof ScoreState,
    increment: boolean
  ) => {
    const setScore = athlete === "blue" ? setBlueScore : setRedScore;
    const pointsMap: Record<string, number> = {
      mount: 4,
      guardPass: 3,
      takedown: 2,
      kneeOnBelly: 2,
    };

    setScore((prev) => {
      const newValue = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      const points = pointsMap[type] || 0;
      const totalChange = increment ? points : -points;

      return {
        ...prev,
        [type]: newValue,
        total: type === "advantage" || type === "penalty" || type === "total"
          ? prev.total
          : Math.max(0, prev.total + totalChange),
      };
    });
  };

  const handleResetAll = () => {
    setBlueScore({
      total: 0,
      advantage: 0,
      penalty: 0,
      mount: 0,
      guardPass: 0,
      takedown: 0,
      kneeOnBelly: 0,
    });
    setRedScore({
      total: 0,
      advantage: 0,
      penalty: 0,
      mount: 0,
      guardPass: 0,
      takedown: 0,
      kneeOnBelly: 0,
    });
    toast.success("Placar resetado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            Placar Digital Jiu-Jitsu
          </h1>
          <p className="text-muted-foreground">Sistema Profissional de Pontuação</p>
        </div>

        {/* Timer Section */}
        <div className="mb-8">
          <Timer />
        </div>

        {/* Scores Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <AthleteScore
            athlete="blue"
            totalScore={blueScore.total}
            advantage={blueScore.advantage}
            penalty={blueScore.penalty}
            mount={blueScore.mount}
            guardPass={blueScore.guardPass}
            takedown={blueScore.takedown}
            kneeOnBelly={blueScore.kneeOnBelly}
            onScoreChange={(type, increment) =>
              handleScoreChange("blue", type as keyof ScoreState, increment)
            }
          />

          <AthleteScore
            athlete="red"
            totalScore={redScore.total}
            advantage={redScore.advantage}
            penalty={redScore.penalty}
            mount={redScore.mount}
            guardPass={redScore.guardPass}
            takedown={redScore.takedown}
            kneeOnBelly={redScore.kneeOnBelly}
            onScoreChange={(type, increment) =>
              handleScoreChange("red", type as keyof ScoreState, increment)
            }
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleResetAll}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Resetar Tudo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
