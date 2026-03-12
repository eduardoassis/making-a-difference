import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Scale, HandHelping } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-image.png";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  const roleCards = [
    { icon: Scale, label: t("roles.legal"), color: "bg-blue-50 text-blue-600 border-blue-200" },
    { icon: Users, label: t("roles.social"), color: "bg-green-50 text-green-600 border-green-200" },
    { icon: Heart, label: t("roles.buddy"), color: "bg-amber-50 text-amber-600 border-amber-200" },
    { icon: HandHelping, label: t("roles.occasional"), color: "bg-rose-50 text-rose-600 border-rose-200" },
  ];

  const steps = [
    { num: 1, label: t("hero.step1") },
    { num: 2, label: t("hero.step2") },
    { num: 3, label: t("hero.step3") },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden text-center relative"
      >
        <img src={heroImage} alt={t("hero.title")} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-2xl font-bold text-white leading-tight mb-1 whitespace-pre-line">
            {t("hero.title")}
          </h1>
        </div>
        </h1>
      </motion.div>

      <Link
        to="/signup"
        className="block w-full py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        {t("hero.cta")}
      </Link>

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

      <div>
        <h2 className="font-bold text-lg mb-3">{t("hero.findRole")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {roleCards.map((card) => (
            <motion.button
              key={card.label}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 ${card.color} transition-all hover:shadow-md`}
            >
              <card.icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{card.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-3">{t("hero.howItWorks")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {steps.map((step) => (
            <div key={step.num} className="bg-card border rounded-xl p-3 text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2">
                {step.num}
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
