import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Mail, MessageCircle, Star, Lightbulb, Users, HeartHandshake, MapPin, Clock, Scale, GraduationCap, ShoppingCart, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

const HomeBottomSections = () => {
  const { t } = useTranslation();

  const signupSteps = [
    t("home.expertise"), t("home.availability"), t("home.languages"), t("home.location"), t("home.activities")
  ];

  const benefits = [
    { icon: HeartHandshake, label: t("home.makeImpact") },
    { icon: Lightbulb, label: t("home.expandSkills") },
    { icon: Users, label: t("home.meetPeople") },
    { icon: Star, label: t("home.getSupport") },
  ];

  return (
    <div className="space-y-8 mt-8">
      <div>
        <h3 className="section-label mb-3">{t("home.signupPreview")}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {signupSteps.map((step, i) => (
            <div key={step} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border-2 border-primary/30 text-primary bg-accent whitespace-nowrap">
              {i + 1}. {step}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 border shadow-sm">
        <h3 className="font-bold text-base mb-2">{t("home.findNearYou")}</h3>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{t("home.postalPlaceholder")}</span>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
            {t("home.search")}
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">{t("home.volunteersSay")}</h3>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl p-5 border shadow-sm"
        >
          <p className="text-sm text-foreground italic mb-3">{t("home.testimonial")}</p>
          <p className="text-xs text-muted-foreground font-medium">{t("home.testimonialAuthor")}</p>
        </motion.div>
        <div className="flex justify-center gap-1.5 mt-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">{t("home.whyVolunteer")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((b) => (
            <div key={b.label} className="flex items-center gap-3 bg-card border rounded-xl p-4">
              <b.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-secondary text-secondary-foreground rounded-xl p-5">
        <h3 className="font-bold text-base mb-3">{t("home.contactUs")}</h3>
        <div className="flex gap-3">
          {[
            { icon: Phone, label: t("home.phone") },
            { icon: Mail, label: t("home.email") },
            { icon: MessageCircle, label: t("home.chat") },
          ].map((c) => (
            <button
              key={c.label}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors"
            >
              <c.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBottomSections;
