import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Scale, HandHelping, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-image.png";

const HeroSection = () => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  const roleCards = [
    {
      icon: Scale,
      label: t("roles.legal"),
      color: "bg-blue-50 text-blue-600 border-blue-200",
      activeColor: "bg-blue-100 border-blue-400 ring-2 ring-blue-200",
      desc: t("hero.roleDesc.legal"),
    },
    {
      icon: Users,
      label: t("roles.social"),
      color: "bg-green-50 text-green-600 border-green-200",
      activeColor: "bg-green-100 border-green-400 ring-2 ring-green-200",
      desc: t("hero.roleDesc.social"),
    },
    {
      icon: Heart,
      label: t("roles.buddy"),
      color: "bg-amber-50 text-amber-600 border-amber-200",
      activeColor: "bg-amber-100 border-amber-400 ring-2 ring-amber-200",
      desc: t("hero.roleDesc.buddy"),
    },
    {
      icon: HandHelping,
      label: t("roles.occasional"),
      color: "bg-rose-50 text-rose-600 border-rose-200",
      activeColor: "bg-rose-100 border-rose-400 ring-2 ring-rose-200",
      desc: t("hero.roleDesc.occasional"),
    },
  ];

  const steps = [
    { num: 1, label: t("hero.step1"), emoji: "📝" },
    { num: 2, label: t("hero.step2"), emoji: "🤝" },
    { num: 3, label: t("hero.step3"), emoji: "🌟" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero image with parallax-like entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden text-center relative"
      >
        <img src={heroImage} alt={t("hero.title")} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white leading-tight mb-1 whitespace-pre-line"
          >
            {t("hero.title")}
          </motion.h1>
        </div>
      </motion.div>

      {/* Animated CTA with pulse */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/signup"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          className="relative block w-full py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-lg shadow-lg overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t("hero.cta")}
            <motion.span
              animate={ctaHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.span>
          </span>
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/what-we-do"
          className="py-3 rounded-xl border-2 border-border text-center font-semibold text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          {t("hero.whatWeDo")}
        </Link>
        <Link
          to="/more-info"
          className="py-3 rounded-xl border-2 border-border text-center font-semibold text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          {t("hero.moreInfo")}
        </Link>
      </div>

      {/* Interactive role finder - tap to expand */}
      <div>
        <h2 className="font-bold text-lg mb-1">{t("hero.findRole")}</h2>
        <p className="text-xs text-muted-foreground mb-3">{t("hero.tapToExplore")}</p>
        <div className="grid grid-cols-2 gap-3">
          {roleCards.map((card, i) => (
            <motion.button
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedRole(selectedRole === i ? null : i)}
              className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all text-left ${
                selectedRole === i ? card.activeColor : card.color
              }`}
            >
              <div className="flex items-center gap-2 w-full">
                <card.icon className="w-5 h-5" />
                <span className="font-semibold text-sm flex-1">{card.label}</span>
                <motion.div
                  animate={{ rotate: selectedRole === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </motion.div>
              </div>
              <AnimatePresence>
                {selectedRole === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[11px] leading-relaxed opacity-80 mt-1">{card.desc}</p>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-1 text-[11px] font-bold mt-2 underline underline-offset-2"
                    >
                      {t("hero.signUpForThis")} <Sparkles className="w-3 h-3" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* How it works - interactive timeline */}
      <div>
        <h2 className="font-bold text-lg mb-3">{t("hero.howItWorks")}</h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-0.5 bg-border z-0" />
          <div className="grid grid-cols-3 gap-2 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="bg-card border rounded-xl p-3 text-center group cursor-default"
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.emoji}
                </motion.div>
                <p className="text-xs font-medium text-foreground leading-tight">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
