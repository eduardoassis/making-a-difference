import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface MotivationalMessageProps {
  step: number;
}

const MotivationalMessage = ({ step }: MotivationalMessageProps) => {
  const { t } = useTranslation();

  const messages = [
    { emoji: "👋", key: "signup.motivation.step0" },
    { emoji: "🌟", key: "signup.motivation.step1" },
    { emoji: "💪", key: "signup.motivation.step2" },
    { emoji: "🎯", key: "signup.motivation.step3" },
    { emoji: "🏁", key: "signup.motivation.step4" },
  ];

  const current = messages[step];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/60 border border-accent mb-4"
      >
        <motion.span
          className="text-lg"
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {current.emoji}
        </motion.span>
        <span className="text-xs font-medium text-accent-foreground">
          {t(current.key)}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default MotivationalMessage;
