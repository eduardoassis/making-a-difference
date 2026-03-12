import { useState } from "react";
import { X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const StepLanguages = () => {
  const { t } = useTranslation();

  const backgroundOptions = [
    { key: "dutchCitizen", label: t("stepLanguages.dutchCitizen") },
    { key: "expat", label: t("stepLanguages.expat") },
    { key: "refugee", label: t("stepLanguages.refugee") },
    { key: "student", label: t("stepLanguages.student") },
    { key: "retired", label: t("stepLanguages.retired") },
  ];

  const [languages, setLanguages] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [background, setBackground] = useState("dutchCitizen");
  const [showRtl, setShowRtl] = useState(false);

  const removeLanguage = (lang: string) =>
    setLanguages((prev) => prev.filter((l) => l !== lang));

  const addLanguage = () => {
    if (searchVal && !languages.includes(searchVal)) {
      setLanguages((prev) => [...prev, searchVal]);
      if (searchVal.toLowerCase() === "arabic") setShowRtl(true);
      setSearchVal("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">{t("stepLanguages.title")}</h2>
      <p className="text-sm text-muted-foreground mb-5">{t("stepLanguages.subtitle")}</p>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">{t("stepLanguages.languagesSpoken")}</h3>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLanguage()}
              placeholder={t("stepLanguages.searchLanguage")}
              className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button onClick={addLanguage} className="px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            {t("stepLanguages.add")}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
            >
              {lang}
              <button onClick={() => removeLanguage(lang)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">{t("stepLanguages.yourBackground")}</h3>
        <div className="space-y-2">
          {backgroundOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setBackground(opt.key)}
              className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                background === opt.key
                  ? "border-primary bg-accent"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  background === opt.key ? "border-primary" : "border-border"
                }`}>
                  {background === opt.key && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                {opt.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showRtl && (
        <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-accent/50" dir="rtl">
          <p className="text-xs font-semibold text-primary mb-2">{t("stepLanguages.rtlPreview")}</p>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5 mb-2">
            <span className="text-sm text-muted-foreground">...ابحث عن لغة</span>
            <Search className="w-4 h-4 text-muted-foreground ml-auto" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-accent text-xs">عربي ×</span>
            <span className="px-3 py-1 rounded-full bg-accent text-xs">انجليزي ×</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepLanguages;
