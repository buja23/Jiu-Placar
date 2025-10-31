import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ScoreCounterProps {
  label: string;
  points: number;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  color: "blue" | "red";
}

export const ScoreCounter = ({
  label,
  points,
  value,
  onIncrement,
  onDecrement,
  color,
}: ScoreCounterProps) => {
  const colorClass = color === "blue" ? "border-athlete-blue/30" : "border-athlete-red/30";
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colorClass} bg-card/50 backdrop-blur-sm`}>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">({points} pts)</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          disabled={value === 0}
          className="h-8 w-8 rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-2xl font-bold w-8 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onIncrement}
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
