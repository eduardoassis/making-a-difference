import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const StepLocation = () => {
  const { t } = useTranslation();

  const suggestedActivities = [
    { key: "legalAid", label: t("stepLocation.legalAid") },
    { key: "buddy", label: t("stepLocation.buddy") },
    { key: "groceries", label: t("stepLocation.groceries") },
    { key: "languageHelp", label: t("stepLocation.languageHelp") },
    { key: "admin", label: t("stepLocation.admin") },
    { key: "sports", label: t("stepLocation.sports") },
  ];

  const [postalCode, setPostalCode] = useState("");
  const [postalError, setPostalError] = useState("");
  const [distance, setDistance] = useState(10);
  const [activitySearch, setActivitySearch] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleActivity = (a: string) =>
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">{t("stepLocation.title")}</h2>
      <p className="text-sm text-muted-foreground mb-5">{t("stepLocation.subtitle")}</p>

      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">{t("stepLocation.postalCode")}</h3>
        <div className={`flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5 ${postalError ? "ring-2 ring-destructive" : ""}`}>
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              if (postalError) setPostalError("");
            }}
            onBlur={() => {
              if (postalCode && !/^\d{4}\s?[A-Za-z]{2}$/.test(postalCode)) {
                setPostalError(t("stepLocation.postalError"));
              }
            }}
            placeholder={t("stepLocation.postalPlaceholder")}
            className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        {postalError && (
          <p className="text-xs text-destructive mt-1">{postalError}</p>
        )}
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">{t("stepLocation.maxDistance")}</h3>
        <input
          type="range"
          min={0}
          max={50}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0 {t("stepLocation.km")}</span>
          <span className="font-bold text-primary">{distance} {t("stepLocation.km")}</span>
          <span>50+ {t("stepLocation.km")}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">{t("stepLocation.activitiesInterested")}</h3>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5 mb-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={activitySearch}
            onChange={(e) => setActivitySearch(e.target.value)}
            placeholder={t("stepLocation.searchActivities")}
            className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <p className="text-xs text-muted-foreground mb-2 font-medium">{t("stepLocation.suggestedForYou")}</p>
        <div className="flex flex-wrap gap-2">
          {suggestedActivities.map((a) => (
            <button
              key={a.key}
              onClick={() => toggleActivity(a.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedActivities.includes(a.key)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fake Map Preview */}
      <div className="relative h-48 rounded-xl overflow-hidden bg-muted/50 border">
        {/* Map Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Water/Canals */}
        <div className="absolute top-4 left-8 right-16 h-3 bg-primary/20 rounded-full transform rotate-12" />
        <div className="absolute bottom-8 left-4 w-3 h-20 bg-primary/20 rounded-full transform -rotate-6" />
        
        {/* Parks/Green Areas */}
        <div className="absolute bottom-4 right-8 w-16 h-12 bg-secondary/50 rounded-xl" />
        
        {/* Streets */}
        <div className="absolute top-0 left-1/3 w-1 h-full bg-background/80" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-background/80" />
        
        {/* Opportunity Pins */}
        <div className="absolute top-12 left-20">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
        </div>
        
        <div className="absolute bottom-16 right-20">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
        </div>
        
        <div className="absolute top-20 right-12">
          <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-destructive-foreground rounded-sm" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-destructive rotate-45" />
        </div>
        
        {/* Map Label */}
        <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
          <p className="text-[10px] font-semibold text-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            {postalCode || "1011 AB"} • 3 {t("home.opp.locations")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepLocation;
