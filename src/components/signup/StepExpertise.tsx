import { useState } from "react";
import { Scale, Users, ClipboardList, Heart, ShoppingCart, Home, GraduationCap, Monitor } from "lucide-react";

const categories = [
  { icon: Scale, label: "Legal" },
  { icon: Users, label: "Social Work" },
  { icon: ClipboardList, label: "Admin" },
  { icon: Heart, label: "Buddy/Mentor" },
  { icon: ShoppingCart, label: "Errands" },
  { icon: Home, label: "Housing Help" },
  { icon: GraduationCap, label: "Education" },
  { icon: Monitor, label: "IT / Tech" },
];

const StepExpertise = () => {
  const [selected, setSelected] = useState<string[]>(["Legal", "Buddy/Mentor"]);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">What are you good at?</h2>
      <p className="text-sm text-muted-foreground mb-5">Select all that apply — you may choose more than one</p>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.label);
          return (
            <button
              key={cat.label}
              onClick={() => toggle(cat.label)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all min-h-[56px] ${
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
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepExpertise;
