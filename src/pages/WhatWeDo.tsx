import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, BookOpen, Users, AlertTriangle, ChevronDown, TrendingUp, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";

const WhatWeDo = () => {
  const { t } = useTranslation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [likedActivities, setLikedActivities] = useState<Set<number>>(new Set());

  const toggleLike = (i: number) => {
    setLikedActivities((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const activities = [
    {
      icon: Scale,
      titleKey: "whatWeDo.legalTitle",
      descKey: "whatWeDo.legalDesc",
      color: "border-blue-200 bg-blue-50",
      activeColor: "border-blue-400 bg-blue-100",
      stat: "120+",
      statLabel: t("whatWeDo.casesHelped"),
    },
    {
      icon: BookOpen,
      titleKey: "whatWeDo.languageTitle",
      descKey: "whatWeDo.languageDesc",
      color: "border-emerald-200 bg-emerald-50",
      activeColor: "border-emerald-400 bg-emerald-100",
      stat: "350+",
      statLabel: t("whatWeDo.learnersSupported"),
    },
    {
      icon: Users,
      titleKey: "whatWeDo.socialTitle",
      descKey: "whatWeDo.socialDesc",
      color: "border-amber-200 bg-amber-50",
      activeColor: "border-amber-400 bg-amber-100",
      stat: "80+",
      statLabel: t("whatWeDo.mentorships"),
    },
    {
      icon: AlertTriangle,
      titleKey: "whatWeDo.emergencyTitle",
      descKey: "whatWeDo.emergencyDesc",
      color: "border-red-200 bg-red-50",
      activeColor: "border-red-400 bg-red-100",
      stat: "500+",
      statLabel: t("whatWeDo.peopleHelped"),
    },
  ];

  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-2"
        >
          {t("whatWeDo.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground mb-6"
        >
          {t("whatWeDo.subtitle")}
        </motion.p>

        <div className="space-y-4">
          {activities.map((a, i) => {
            const isExpanded = expandedCard === i;
            const isLiked = likedActivities.has(i);

            return (
              <motion.div
                key={a.titleKey}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.99 }}
                className={`rounded-xl border-2 p-5 transition-all cursor-pointer ${
                  isExpanded ? a.activeColor : a.color
                }`}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={isExpanded ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <a.icon className="w-5 h-5" />
                  </motion.div>
                  <h3 className="font-bold text-base flex-1">{t(a.titleKey)}</h3>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </motion.div>
                </div>
                <p className="text-sm text-foreground/70 mb-3">{t(a.descKey)}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {/* Impact stat */}
                      <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-background/60">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <div>
                          <span className="text-lg font-black text-foreground">{a.stat}</span>
                          <span className="text-xs text-muted-foreground ml-1.5">{a.statLabel}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to="/signup"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                        >
                          {t("whatWeDo.volunteerHere")}
                        </Link>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          onClick={(e) => { e.stopPropagation(); toggleLike(i); }}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isLiked
                              ? "bg-primary/10 border-primary/30 text-primary"
                              : "border-border text-muted-foreground hover:text-primary"
                          }`}
                        >
                          <motion.span
                            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                            className="flex items-center gap-1"
                          >
                            {isLiked ? <Sparkles className="w-3.5 h-3.5" /> : null}
                            {isLiked ? t("whatWeDo.interested") : t("whatWeDo.imInterested")}
                          </motion.span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>
    </MobileFrame>
  );
};

export default WhatWeDo;
