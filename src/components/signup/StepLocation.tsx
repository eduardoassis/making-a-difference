import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import FakeMap from "../FakeMap";

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

      {/* Leaflet Map Preview */}
      <FakeMap
        className="h-48"
        pins={[
          { lat: 52.3676, lng: 4.9041, label: t("stepLocation.legalAid") },
          { lat: 52.3784, lng: 4.8900, label: t("stepLocation.buddy") },
          { lat: 52.3600, lng: 4.9300, label: t("stepLocation.languageHelp") },
        ]}
      />
    </div>
  );
};

export default StepLocation;
