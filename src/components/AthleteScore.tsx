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
    <div className="flex flex-col gap-6">
      {/* Main Score Display */}
      <div className={`${bgClass} rounded-2xl p-8 text-center`}>
        <h2 className="text-xl font-bold text-white mb-4 tracking-wide">{label}</h2>
        <div className="score-display text-white drop-shadow-lg">{totalScore}</div>
        <p className="text-white/80 text-sm font-medium mt-2">PONTOS</p>
      </div>

      {/* Advantage and Penalty */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-4 text-center border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">VANTAGEM</p>
            <div className="flex gap-1">
              <button
                onClick={() => onScoreChange("advantage", false)}
                disabled={advantage === 0}
                className="h-7 w-7 rounded-full bg-secondary hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <button
                onClick={() => onScoreChange("advantage", true)}
                className="h-7 w-7 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center"
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>
          <div className="text-4xl font-black">{advantage}</div>
        </div>

        <div className="bg-card rounded-xl p-4 text-center border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">PUNIÇÃO</p>
            <div className="flex gap-1">
              <button
                onClick={() => onScoreChange("penalty", false)}
                disabled={penalty === 0}
                className="h-7 w-7 rounded-full bg-secondary hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <button
                onClick={() => onScoreChange("penalty", true)}
                className="h-7 w-7 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center"
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>
          <div className="text-4xl font-black">{penalty}</div>
        </div>
      </div>

      {/* Specific Points */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Pontos Específicos</h3>
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
  );
};
