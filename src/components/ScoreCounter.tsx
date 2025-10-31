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
    <div className={`flex items-center justify-between p-2 rounded-lg border ${colorClass} bg-card/50 backdrop-blur-sm`}>
      <div className="flex-1">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">({points} pts)</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          disabled={value === 0}
          className="h-7 w-7 rounded-full"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-xl font-bold w-6 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onIncrement}
          className="h-7 w-7 rounded-full"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
