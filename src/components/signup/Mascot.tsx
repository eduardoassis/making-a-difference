import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface MascotProps {
  step: number;
  celebrating: boolean;
}

const MASCOT_STATES = [
  { emoji: "🙋", pose: "wave", key: "signup.mascot.welcome" },
  { emoji: "🤩", pose: "excited", key: "signup.mascot.skills" },
  { emoji: "💃", pose: "dance", key: "signup.mascot.halfway" },
  { emoji: "🧠", pose: "think", key: "signup.mascot.languages" },
  { emoji: "🏃", pose: "run", key: "signup.mascot.finish" },
];

const poseAnimations: Record<string, any> = {
  wave: { rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.8, delay: 0.2 } },
  excited: { scale: [1, 1.3, 1, 1.2, 1], transition: { duration: 0.6, delay: 0.2 } },
  dance: { y: [0, -8, 0, -5, 0], rotate: [0, -5, 5, -3, 0], transition: { duration: 0.8, delay: 0.2 } },
  think: { rotate: [0, 10, 0], scale: [1, 1.1, 1], transition: { duration: 1, delay: 0.2 } },
  run: { x: [0, 5, -3, 4, 0], transition: { duration: 0.5, delay: 0.2 } },
};

const celebrationAnimation = {
  y: [0, -15, 0, -10, 0, -5, 0],
  rotate: [0, -20, 20, -15, 15, -5, 0],
  scale: [1, 1.4, 1, 1.3, 1, 1.1, 1],
  transition: { duration: 1 },
};

const Mascot = ({ step, celebrating }: MascotProps) => {
  const { t } = useTranslation();
  const state = MASCOT_STATES[step];

  return (
    <div className="flex items-center gap-2.5 mb-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative"
        >
          <motion.div
            className="w-11 h-11 rounded-full bg-accent border-2 border-primary/30 flex items-center justify-center text-xl select-none shadow-md"
            animate={celebrating ? celebrationAnimation : poseAnimations[state.pose]}
          >
            {celebrating ? "🎉" : state.emoji}
          </motion.div>
          {/* Speech bubble tail */}
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent/80 rotate-45 border-r border-t border-primary/10" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={celebrating ? "celebrate" : step}
          initial={{ opacity: 0, x: -10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex-1 px-3 py-2 rounded-xl bg-accent/60 border border-accent text-xs font-medium text-accent-foreground leading-relaxed"
        >
          {celebrating ? t("signup.mascot.celebrate") : t(state.key)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Mascot;
