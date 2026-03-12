import { useState } from "react";
import { useTranslation } from "react-i18next";

const StepAvailability = () => {
  const { t } = useTranslation();

  const days = [
    { key: "mon", label: t("stepAvailability.mon") },
    { key: "tue", label: t("stepAvailability.tue") },
    { key: "wed", label: t("stepAvailability.wed") },
    { key: "thu", label: t("stepAvailability.thu") },
    { key: "fri", label: t("stepAvailability.fri") },
    { key: "sat", label: t("stepAvailability.sat") },
    { key: "sun", label: t("stepAvailability.sun") },
  ];

  const times = [
    { key: "morning", label: t("stepAvailability.morning"), sub: "7 – 12" },
    { key: "afternoon", label: t("stepAvailability.afternoon"), sub: "12 – 17" },
    { key: "evening", label: t("stepAvailability.evening"), sub: "17 – 21" },
  ];

  const frequencies = [
    { key: "weekly", label: t("stepAvailability.weekly") },
    { key: "biWeekly", label: t("stepAvailability.biWeekly") },
    { key: "monthly", label: t("stepAvailability.monthly") },
    { key: "flexible", label: t("stepAvailability.flexible") },
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("flexible");
  const [weekends, setWeekends] = useState(true);

  const toggleDay = (d: string) =>
    setSelectedDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  const toggleTime = (t: string) =>
    setSelectedTimes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">{t("stepAvailability.title")}</h2>
      <p className="text-sm text-muted-foreground mb-5">{t("stepAvailability.subtitle")}</p>

      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">{t("stepAvailability.days")}</h3>
        <div className="flex gap-1.5">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => toggleDay(d.key)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedDays.includes(d.key)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">{t("stepAvailability.timeOfDay")}</h3>
        <div className="grid grid-cols-3 gap-2">
          {times.map((tm) => (
            <button
              key={tm.key}
              onClick={() => toggleTime(tm.key)}
              className={`py-3 rounded-xl border-2 text-center transition-colors ${
                selectedTimes.includes(tm.key)
                  ? "border-primary bg-accent"
                  : "border-border"
              }`}
            >
              <div className="text-sm font-semibold">{tm.label}</div>
              <div className="text-xs text-muted-foreground">{tm.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">{t("stepAvailability.frequency")}</h3>
        <div className="flex gap-2 flex-wrap">
          {frequencies.map((f) => (
            <button
              key={f.key}
              onClick={() => setFrequency(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                frequency === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-card border rounded-xl p-4">
        <span className="text-sm font-medium">{t("stepAvailability.weekends")}</span>
        <button
          onClick={() => setWeekends(!weekends)}
          className={`relative w-12 h-7 rounded-full transition-colors ${weekends ? "bg-primary" : "bg-border"}`}
        >
          <div
            className={`absolute top-0.5 w-6 h-6 rounded-full bg-card shadow transition-transform ${
              weekends ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default StepAvailability;
