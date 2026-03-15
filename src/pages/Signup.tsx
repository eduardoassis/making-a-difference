import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, PartyPopper, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";
import StepContact from "@/components/signup/StepContact";
import StepExpertise from "@/components/signup/StepExpertise";
import StepAvailability from "@/components/signup/StepAvailability";
import StepLanguages from "@/components/signup/StepLanguages";
import StepLocation from "@/components/signup/StepLocation";
import ProgressBar from "@/components/signup/ProgressBar";
import StepBadges from "@/components/signup/StepBadges";
import XPCounter from "@/components/signup/XPCounter";
import Mascot from "@/components/signup/Mascot";
import FloatingXP from "@/components/signup/FloatingXP";

const XP_PER_STEP = 200;

const Signup = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showFloatingXP, setShowFloatingXP] = useState(false);
  const [justCompletedStep, setJustCompletedStep] = useState<number | undefined>();
  const [mascotCelebrating, setMascotCelebrating] = useState(false);
  const { t } = useTranslation();

  const stepLabels = [
    t("signup.contact"), t("signup.expertise"), t("signup.availability"), t("signup.languages"), t("signup.locationLabel")
  ];

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#f97316", "#fbbf24", "#34d399", "#60a5fa", "#a855f7"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#f97316", "#fbbf24", "#34d399", "#60a5fa", "#a855f7"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const next = () => {
    if (step < 4) {
      setJustCompletedStep(step);
      setShowFloatingXP(true);
      setMascotCelebrating(true);

      setTimeout(() => {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 1200);
      }, 300);

      setTimeout(() => {
        setShowFloatingXP(false);
        setMascotCelebrating(false);
        setStep(step + 1);
        setJustCompletedStep(undefined);
      }, 800);
    } else {
      setCompleted(true);
      setTimeout(fireConfetti, 300);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const totalXP = completed ? 1000 : step * XP_PER_STEP;

  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-4">
        {!completed ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              {step > 0 ? (
                <button onClick={back} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <Link to="/" className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              )}
              <span className="text-xs text-muted-foreground font-medium">
                {t("signup.stepOf", { current: step + 1, total: 5 })}
              </span>
            </div>

            <XPCounter step={step} showLevelUp={showLevelUp} />
            <ProgressBar step={step} totalSteps={5} />
            <StepBadges currentStep={step} stepLabels={stepLabels} justCompleted={justCompletedStep} />
            <Mascot step={step} celebrating={mascotCelebrating} />

            <FloatingXP show={showFloatingXP} amount={XP_PER_STEP} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && <StepContact />}
                {step === 1 && <StepExpertise />}
                {step === 2 && <StepAvailability />}
                {step === 3 && <StepLanguages />}
                {step === 4 && <StepLocation />}
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative block w-full mt-5 py-3.5 rounded-xl bg-primary text-primary-foreground text-center font-bold text-sm overflow-hidden group"
            >
              <span className="relative z-10">
                {step < 4 ? t("signup.next", { step: stepLabels[step + 1] }) : t("signup.createProfile")}
              </span>
              {/* Shine effect on button */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>

            <motion.p
              className="text-center text-[10px] text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              🎮 +{XP_PER_STEP} XP {t("signup.xp.perStep")}
            </motion.p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
              className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <PartyPopper className="w-10 h-10" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-1"
            >
              {t("signup.allSet")} 🎉
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{totalXP} XP</span>
              <span className="text-xs text-muted-foreground">• {t("signup.xp.level5")}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-sm mb-5"
            >
              {t("signup.allSetDesc")}
            </motion.p>

            {/* Earned badges with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t("signup.badgesEarned")}
              </p>
              <div className="flex justify-center gap-2.5">
                {["📝", "💡", "📅", "🌍", "📍"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.12, type: "spring", bounce: 0.6 }}
                    className="w-11 h-11 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-lg shadow-sm"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <Link
                to="/"
                className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:brightness-110 transition-all"
              >
                {t("signup.backToHome")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </main>
    </MobileFrame>
  );
};

export default Signup;
