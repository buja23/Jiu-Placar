import { ScoreCounter } from "./ScoreCounter";

interface AthleteScoreProps {
  athlete: "blue" | "red";
  totalScore: number;
  advantage: number;
  penalty: number;
  mount: number;
  guardPass: number;
  takedown: number;
  kneeOnBelly: number;
  onScoreChange: (type: string, increment: boolean) => void;
}

export const AthleteScore = ({
  athlete,
  totalScore,
  advantage,
  penalty,
  mount,
  guardPass,
  takedown,
  kneeOnBelly,
  onScoreChange,
}: AthleteScoreProps) => {
  const isBlue = athlete === "blue";
  const bgClass = isBlue ? "athlete-blue-bg" : "athlete-red-bg";
  const label = isBlue ? "ATLETA 1 - AZUL" : "ATLETA 2 - VERMELHO";

  return (
    <div className="flex flex-col gap-3">
      {/* Main Score Display */}
      <div className={`${bgClass} rounded-xl p-4 text-center`}>
        <h2 className="text-sm font-bold text-white mb-2 tracking-wide">{label}</h2>
        <div className="score-display text-white drop-shadow-lg">{totalScore}</div>
        <p className="text-white/70 text-xs font-medium mt-1">PONTOS</p>
      </div>

      {/* Advantage and Penalty */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card rounded-lg p-2 border border-border flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-foreground">VANTAGEM</p>
            <div className="flex gap-0.5">
              <button
                onClick={() => onScoreChange("advantage", false)}
                disabled={advantage === 0}
                className="h-6 w-6 rounded-full bg-secondary hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-sm"
              >
                −
              </button>
              <button
                onClick={() => onScoreChange("advantage", true)}
                className="h-6 w-6 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-2xl font-black text-center flex-1 flex items-center justify-center">{advantage}</div>
        </div>

        <div className="bg-card rounded-lg p-2 border border-border flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-foreground">PUNIÇÃO</p>
            <div className="flex gap-0.5">
              <button
                onClick={() => onScoreChange("penalty", false)}
                disabled={penalty === 0}
                className="h-6 w-6 rounded-full bg-secondary hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-sm"
              >
                −
              </button>
              <button
                onClick={() => onScoreChange("penalty", true)}
                className="h-6 w-6 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-2xl font-black text-center flex-1 flex items-center justify-center">{penalty}</div>
        </div>
      </div>

      {/* Specific Points */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Pontos Específicos</h3>
        <div className="grid grid-cols-2 gap-2">
          <ScoreCounter
            label="Montada"
            points={4}
            value={mount}
            onIncrement={() => onScoreChange("mount", true)}
            onDecrement={() => onScoreChange("mount", false)}
            color={athlete}
          />
          <ScoreCounter
            label="Passagem"
            points={3}
            value={guardPass}
            onIncrement={() => onScoreChange("guardPass", true)}
            onDecrement={() => onScoreChange("guardPass", false)}
            color={athlete}
          />
          <ScoreCounter
            label="Queda"
            points={2}
            value={takedown}
            onIncrement={() => onScoreChange("takedown", true)}
            onDecrement={() => onScoreChange("takedown", false)}
            color={athlete}
          />
          <ScoreCounter
            label="Joelho na Barriga"
            points={2}
            value={kneeOnBelly}
            onIncrement={() => onScoreChange("kneeOnBelly", true)}
            onDecrement={() => onScoreChange("kneeOnBelly", false)}
            color={athlete}
          />
        </div>
      </div>
    </div>
  );
};
