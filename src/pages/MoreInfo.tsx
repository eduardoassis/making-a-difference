import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";

const faqKeys = [
  { titleKey: "moreInfo.howVolunteeringWorks", contentKey: "moreInfo.howVolunteeringWorksContent" },
  { titleKey: "moreInfo.screeningProcess", contentKey: "moreInfo.screeningProcessContent" },
  { titleKey: "moreInfo.supportForVolunteers", contentKey: "moreInfo.supportForVolunteersContent" },
  { titleKey: "moreInfo.timeCommitment", contentKey: "moreInfo.timeCommitmentContent" },
  { titleKey: "moreInfo.typesOfRefugees", contentKey: "moreInfo.typesOfRefugeesContent" },
  { titleKey: "moreInfo.faq", contentKey: "moreInfo.faqContent" },
];

const MoreInfo = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {t("moreInfo.back")}
        </Link>

        <h1 className="text-2xl font-bold mb-6">{t("moreInfo.title")}</h1>

        <div className="space-y-2">
          {faqKeys.map((item, i) => (
            <div key={item.titleKey} className="border rounded-xl overflow-hidden bg-card">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left rtl:text-right"
              >
                <span className="font-semibold text-sm">{t(item.titleKey)}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {t(item.contentKey)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <Link
          to="/signup"
          className="block w-full mt-8 py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-base"
        >
          {t("moreInfo.readyToStart")}
        </Link>
      </main>
    </MobileFrame>
  );
};

export default MoreInfo;
