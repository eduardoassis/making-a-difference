import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, PartyPopper } from "lucide-react";
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
import MotivationalMessage from "@/components/signup/MotivationalMessage";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showStepTransition, setShowStepTransition] = useState(false);
  const { t } = useTranslation();

  const stepLabels = [
    t("signup.contact"), t("signup.expertise"), t("signup.availability"), t("signup.languages"), t("signup.locationLabel")
  ];

  const fireConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#f97316", "#fbbf24", "#34d399", "#60a5fa"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#f97316", "#fbbf24", "#34d399", "#60a5fa"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const next = () => {
    if (step < 4) {
      setShowStepTransition(true);
      setTimeout(() => {
        setStep(step + 1);
        setShowStepTransition(false);
      }, 600);
    } else {
      setCompleted(true);
      setTimeout(fireConfetti, 300);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        {!completed ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              {step > 0 ? (
                <button onClick={back} className="p-1 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <Link to="/" className="p-1 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              )}
              <span className="text-sm text-muted-foreground font-medium">
                {t("signup.stepOf", { current: step + 1, total: 5 })}
              </span>
            </div>

            <ProgressBar step={step} totalSteps={5} />
            <StepBadges currentStep={step} stepLabels={stepLabels} />
            <MotivationalMessage step={step} />

            {/* Step transition overlay */}
            <AnimatePresence>
              {showStepTransition && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {t("signup.stepComplete")} ✨
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
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
              whileTap={{ scale: 0.97 }}
              className="block w-full mt-6 py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-base hover:brightness-110 transition-all"
            >
              {step < 4 ? t("signup.next", { step: stepLabels[step + 1] }) : t("signup.createProfile")}
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
              className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4"
            >
              <PartyPopper className="w-10 h-10" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-2"
            >
              {t("signup.allSet")} 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-sm mb-4"
            >
              {t("signup.allSetDesc")}
            </motion.p>

            {/* Earned badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t("signup.badgesEarned")}
              </p>
              <div className="flex justify-center gap-3">
                {["📝", "💡", "📅", "🌍", "📍"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring", bounce: 0.6 }}
                    className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Link
                to="/"
                className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
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
