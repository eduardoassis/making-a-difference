import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowLeft, ThumbsUp, ThumbsDown, BookOpen } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";

const faqKeys = [
  { titleKey: "moreInfo.howVolunteeringWorks", contentKey: "moreInfo.howVolunteeringWorksContent", emoji: "📋" },
  { titleKey: "moreInfo.screeningProcess", contentKey: "moreInfo.screeningProcessContent", emoji: "🔍" },
  { titleKey: "moreInfo.supportForVolunteers", contentKey: "moreInfo.supportForVolunteersContent", emoji: "🤝" },
  { titleKey: "moreInfo.timeCommitment", contentKey: "moreInfo.timeCommitmentContent", emoji: "⏰" },
  { titleKey: "moreInfo.typesOfRefugees", contentKey: "moreInfo.typesOfRefugeesContent", emoji: "🌍" },
  { titleKey: "moreInfo.faq", contentKey: "moreInfo.faqContent", emoji: "❓" },
];

const MoreInfo = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [helpfulItems, setHelpfulItems] = useState<Record<number, "yes" | "no">>({});
  const [readItems, setReadItems] = useState<Set<number>>(new Set([0]));
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleOpen = (i: number) => {
    const next = openIndex === i ? null : i;
    setOpenIndex(next);
    if (next !== null) {
      setReadItems((prev) => new Set(prev).add(next));
    }
  };

  const markHelpful = (i: number, value: "yes" | "no") => {
    setHelpfulItems((prev) => ({ ...prev, [i]: value }));
  };

  const readPercentage = Math.round((readItems.size / faqKeys.length) * 100);

  return (
    <MobileFrame>
      <StickyHeader />

      {/* Reading progress bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b">
        <div className="px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold text-primary">{readPercentage}% {t("moreInfo.read")}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            {readItems.size}/{faqKeys.length} {t("moreInfo.sections")}
          </span>
        </div>
        <motion.div
          className="h-0.5 bg-primary origin-left"
          style={{ scaleX: readPercentage / 100 }}
        />
      </div>

      <main ref={containerRef} className="px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("moreInfo.back")}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          {t("moreInfo.title")}
        </motion.h1>

        <div className="space-y-2">
          {faqKeys.map((item, i) => {
            const isOpen = openIndex === i;
            const isRead = readItems.has(i);
            const helpful = helpfulItems[i];

            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`border rounded-xl overflow-hidden transition-all ${
                  isOpen ? "bg-accent/30 border-primary/20" : "bg-card"
                }`}
              >
                <button
                  onClick={() => handleOpen(i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left rtl:text-right"
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className={`font-semibold text-sm flex-1 ${isRead ? "text-foreground" : "text-muted-foreground"}`}>
                    {t(item.titleKey)}
                  </span>
                  {isRead && !isOpen && (
                    <span className="text-[10px] text-primary font-bold">✓</span>
                  )}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {t(item.contentKey)}
                        </p>

                        {/* Was this helpful? */}
                        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                          <span className="text-[11px] text-muted-foreground">{t("moreInfo.helpful")}</span>
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            onClick={() => markHelpful(i, "yes")}
                            className={`p-1.5 rounded-lg transition-colors ${
                              helpful === "yes"
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            onClick={() => markHelpful(i, "no")}
                            className={`p-1.5 rounded-lg transition-colors ${
                              helpful === "no"
                                ? "bg-destructive/10 text-destructive"
                                : "text-muted-foreground hover:text-destructive"
                            }`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </motion.button>
                          <AnimatePresence>
                            {helpful && (
                              <motion.span
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] text-muted-foreground"
                              >
                                {t("moreInfo.thanksFeedback")}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/signup"
            className="relative block w-full mt-8 py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-base overflow-hidden"
          >
            <span className="relative z-10">{t("moreInfo.readyToStart")}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
            />
          </Link>
        </motion.div>
      </main>
    </MobileFrame>
  );
};

export default MoreInfo;
