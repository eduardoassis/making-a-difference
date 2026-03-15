import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEP_ICONS = ["📝", "💡", "📅", "🌍", "📍"];

interface StepBadgesProps {
  currentStep: number;
  stepLabels: string[];
}

const StepBadges = ({ currentStep, stepLabels }: StepBadgesProps) => {
  return (
    <div className="flex justify-between mb-4">
      {stepLabels.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isLocked = i > currentStep;

        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <motion.div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                isCompleted
                  ? "bg-primary border-primary text-primary-foreground"
                  : isActive
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-muted text-muted-foreground opacity-50"
              }`}
              animate={
                isCompleted
                  ? { scale: [1, 1.2, 1] }
                  : isActive
                  ? { scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className={isLocked ? "grayscale" : ""}>{STEP_ICONS[i]}</span>
              )}
            </motion.div>
            <span
              className={`text-[10px] leading-tight text-center font-medium ${
                isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepBadges;
