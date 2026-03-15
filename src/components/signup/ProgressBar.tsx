import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const { t } = useTranslation();
  const percentage = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-bold text-primary tracking-wide">
          {percentage}% {t("signup.xp.complete")}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {step + 1}/{totalSteps}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
