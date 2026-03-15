import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

const STEP_ICONS = ["📝", "💡", "📅", "🌍", "📍"];

interface StepBadgesProps {
  currentStep: number;
  stepLabels: string[];
  justCompleted?: number;
}

const StepBadges = ({ currentStep, stepLabels, justCompleted }: StepBadgesProps) => {
  return (
    <div className="flex justify-between mb-3 gap-1">
      {stepLabels.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isLocked = i > currentStep;
        const wasJustCompleted = justCompleted === i;

        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1" style={{ perspective: "600px" }}>
            <motion.div
              className="relative w-10 h-10"
              style={{ transformStyle: "preserve-3d" }}
              animate={
                wasJustCompleted
                  ? { rotateY: [0, 180, 360], scale: [1, 1.3, 1] }
                  : isActive
                  ? { scale: [1, 1.08, 1] }
                  : {}
              }
              transition={
                wasJustCompleted
                  ? { duration: 0.7, ease: "easeInOut" }
                  : isActive
                  ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground shadow-md"
                    : isActive
                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20 ring-offset-1"
                    : "border-border bg-muted/50 text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4.5 h-4.5" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5 opacity-40" />
                ) : (
                  <span>{STEP_ICONS[i]}</span>
                )}
              </div>

              {/* Glow ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <span
              className={`text-[9px] leading-tight text-center font-semibold truncate w-full ${
                isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground/60"
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
