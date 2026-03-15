import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const percentage = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-primary">{percentage}%</span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(35, 95%, 58%), hsl(var(--primary)))",
            backgroundSize: "200% 100%",
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${percentage}%`,
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            width: { duration: 0.5, ease: "easeOut" },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute top-0 h-full w-8 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          animate={{ left: ["-2rem", `${percentage}%`] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
