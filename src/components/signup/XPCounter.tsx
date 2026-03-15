import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";

interface XPCounterProps {
  step: number;
  showLevelUp: boolean;
}

const XP_PER_STEP = 200;
const LEVELS = [
  { name: "signup.xp.level1", minXP: 0 },
  { name: "signup.xp.level2", minXP: 200 },
  { name: "signup.xp.level3", minXP: 400 },
  { name: "signup.xp.level4", minXP: 600 },
  { name: "signup.xp.level5", minXP: 800 },
];

const XPCounter = ({ step, showLevelUp }: XPCounterProps) => {
  const { t } = useTranslation();
  const currentXP = step * XP_PER_STEP;
  const maxXP = 1000;
  const currentLevel = LEVELS[step];
  const nextLevel = LEVELS[Math.min(step + 1, LEVELS.length - 1)];
  const xpInLevel = currentXP - currentLevel.minXP;
  const xpForNextLevel = nextLevel.minXP - currentLevel.minXP || XP_PER_STEP;
  const levelProgress = (xpInLevel / xpForNextLevel) * 100;

  return (
    <div className="relative mb-3">
      {/* XP Bar */}
      <div className="flex items-center gap-2 mb-1">
        <motion.div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30"
          animate={showLevelUp ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Zap className="w-3.5 h-3.5 text-primary" />
          <motion.span
            className="text-xs font-bold text-primary tabular-nums"
            key={currentXP}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {currentXP} XP
          </motion.span>
        </motion.div>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          {t(currentLevel.name)}
        </span>
      </div>

      {/* XP Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary via-[hsl(35,95%,58%)] to-primary"
          style={{ backgroundSize: "200% 100%" }}
          initial={{ width: 0 }}
          animate={{
            width: `${(currentXP / maxXP) * 100}%`,
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            width: { duration: 0.6, ease: "easeOut" },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
        />
        {/* Sparkle particles on bar */}
        <motion.div
          className="absolute top-0 h-full w-6"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
          animate={{ left: ["-1.5rem", `${(currentXP / maxXP) * 100}%`] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
        />
      </div>

      {/* Level Up popup */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -5 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg whitespace-nowrap flex items-center gap-1">
              <span>⚡</span>
              {t("signup.xp.levelUp")}
              <span>⚡</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default XPCounter;
