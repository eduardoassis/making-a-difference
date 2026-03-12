import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";
import StepContact from "@/components/signup/StepContact";
import StepExpertise from "@/components/signup/StepExpertise";
import StepAvailability from "@/components/signup/StepAvailability";
import StepLanguages from "@/components/signup/StepLanguages";
import StepLocation from "@/components/signup/StepLocation";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();

  const stepLabels = [
    t("signup.contact"), t("signup.expertise"), t("signup.availability"), t("signup.languages"), t("signup.locationLabel")
  ];

  const next = () => {
    if (step < 4) setStep(step + 1);
    else setCompleted(true);
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
            <div className="flex items-center gap-2 mb-4">
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
                {t("signup.stepOf", { current: step + 1, total: 4 })}
              </span>
            </div>

            <div className="flex gap-1.5 mb-6">
              {stepLabels.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>

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

            <button
              onClick={next}
              className="block w-full mt-6 py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-base"
            >
              {step < 3 ? t("signup.next", { step: stepLabels[step + 1] }) : t("signup.createProfile")}
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-success text-success-foreground flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t("signup.allSet")}</h2>
            <p className="text-muted-foreground text-sm mb-6">{t("signup.allSetDesc")}</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
            >
              {t("signup.backToHome")}
            </Link>
          </motion.div>
        )}
      </main>
    </MobileFrame>
  );
};

export default Signup;
