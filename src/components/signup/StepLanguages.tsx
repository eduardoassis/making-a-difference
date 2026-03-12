import { useState } from "react";
import { X, Search } from "lucide-react";

const backgroundOptions = [
  "Dutch citizen",
  "Expat / international",
  "Refugee / asylum-seeker",
  "Student",
  "Retired",
];

const StepLanguages = () => {
  const [languages, setLanguages] = useState<string[]>(["Dutch", "English"]);
  const [searchVal, setSearchVal] = useState("");
  const [background, setBackground] = useState("Dutch citizen");
  const [showRtl, setShowRtl] = useState(false);

  const removeLanguage = (lang: string) =>
    setLanguages((prev) => prev.filter((l) => l !== lang));

  const addLanguage = () => {
    if (searchVal && !languages.includes(searchVal)) {
      setLanguages((prev) => [...prev, searchVal]);
      setSearchVal("");
      if (searchVal.toLowerCase() === "arabic") setShowRtl(true);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Your languages & background</h2>
      <p className="text-sm text-muted-foreground mb-5">Tell us about yourself so we can match you</p>

      {/* Language Search */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Languages you speak</h3>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLanguage()}
              placeholder="Search language..."
              className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button onClick={addLanguage} className="px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            + Add
          </button>
        </div>

        {/* Language Chips */}
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

      {/* Background */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Your background</h3>
        <div className="space-y-2">
          {backgroundOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setBackground(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                background === opt
                  ? "border-primary bg-accent"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  background === opt ? "border-primary" : "border-border"
                }`}>
                  {background === opt && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                {opt}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RTL Preview */}
      {showRtl && (
        <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-accent/50" dir="rtl">
          <p className="text-xs font-semibold text-primary mb-2">Arabic (RTL) Adaptation Preview</p>
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
