import { useState } from "react";
import { Scale, Users, ClipboardList, Heart, ShoppingCart, Home, GraduationCap, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

const StepExpertise = () => {
  const { t } = useTranslation();

  const categories = [
    { icon: Scale, labelKey: "stepExpertise.legal" },
    { icon: Users, labelKey: "stepExpertise.socialWork" },
    { icon: ClipboardList, labelKey: "stepExpertise.admin" },
    { icon: Heart, labelKey: "stepExpertise.buddyMentor" },
    { icon: ShoppingCart, labelKey: "stepExpertise.errands" },
    { icon: Home, labelKey: "stepExpertise.housingHelp" },
    { icon: GraduationCap, labelKey: "stepExpertise.education" },
    { icon: Monitor, labelKey: "stepExpertise.itTech" },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((l) => l !== key) : [...prev, key]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">{t("stepExpertise.title")}</h2>
      <p className="text-sm text-muted-foreground mb-5">{t("stepExpertise.subtitle")}</p>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.labelKey);
          return (
            <button
              key={cat.labelKey}
              onClick={() => toggle(cat.labelKey)}
              className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all min-h-[56px] ${
                isSelected
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected ? "border-primary bg-primary" : "border-border"
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <cat.icon className="w-4 h-4 text-foreground/70 flex-shrink-0" />
              <span className="text-xs font-medium text-foreground text-left leading-tight">{t(cat.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepExpertise;
