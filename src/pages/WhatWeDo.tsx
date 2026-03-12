import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, BookOpen, Users, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";

const WhatWeDo = () => {
  const { t } = useTranslation();

  const activities = [
    { icon: Scale, titleKey: "whatWeDo.legalTitle", descKey: "whatWeDo.legalDesc", color: "border-blue-200 bg-blue-50" },
    { icon: BookOpen, titleKey: "whatWeDo.languageTitle", descKey: "whatWeDo.languageDesc", color: "border-emerald-200 bg-emerald-50" },
    { icon: Users, titleKey: "whatWeDo.socialTitle", descKey: "whatWeDo.socialDesc", color: "border-amber-200 bg-amber-50" },
    { icon: AlertTriangle, titleKey: "whatWeDo.emergencyTitle", descKey: "whatWeDo.emergencyDesc", color: "border-red-200 bg-red-50" },
  ];

  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">{t("whatWeDo.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("whatWeDo.subtitle")}</p>

        <div className="space-y-4">
          {activities.map((a, i) => (
            <motion.div
              key={a.titleKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border-2 p-5 ${a.color}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <a.icon className="w-5 h-5" />
                <h3 className="font-bold text-base">{t(a.titleKey)}</h3>
              </div>
              <p className="text-sm text-foreground/70 mb-3">{t(a.descKey)}</p>
              <Link
                to="/signup"
                className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                {t("whatWeDo.volunteerHere")}
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </MobileFrame>
  );
};

export default WhatWeDo;
