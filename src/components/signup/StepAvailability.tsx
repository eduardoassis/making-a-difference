import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = [
  { label: "Morning", sub: "7 – 12" },
  { label: "Afternoon", sub: "12 – 17" },
  { label: "Evening", sub: "17 – 21" },
];
const frequencies = ["Weekly", "Bi-weekly", "Monthly", "Flexible"];

const StepAvailability = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(["Morning", "Afternoon"]);
  const [frequency, setFrequency] = useState("Flexible");
  const [weekends, setWeekends] = useState(true);

  const toggleDay = (d: string) =>
    setSelectedDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  const toggleTime = (t: string) =>
    setSelectedTimes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">When are you available?</h2>
      <p className="text-sm text-muted-foreground mb-5">Tap to select days, time blocks, and frequency</p>

      {/* Days */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Days</h3>
        <div className="flex gap-1.5">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => toggleDay(d)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedDays.includes(d)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Time Blocks */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Time of day</h3>
        <div className="grid grid-cols-3 gap-2">
          {times.map((t) => (
            <button
              key={t.label}
              onClick={() => toggleTime(t.label)}
              className={`py-3 rounded-xl border-2 text-center transition-colors ${
                selectedTimes.includes(t.label)
                  ? "border-primary bg-accent"
                  : "border-border"
              }`}
            >
              <div className="text-sm font-semibold">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Frequency</h3>
        <div className="flex gap-2 flex-wrap">
          {frequencies.map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                frequency === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Weekend Toggle */}
      <div className="flex items-center justify-between bg-card border rounded-xl p-4">
        <span className="text-sm font-medium">Also available on weekends?</span>
        <button
          onClick={() => setWeekends(!weekends)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            weekends ? "bg-primary" : "bg-border"
          }`}
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
