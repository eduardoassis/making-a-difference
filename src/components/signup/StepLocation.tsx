import { useState } from "react";
import { MapPin, Search } from "lucide-react";

const suggestedActivities = ["Legal aid", "Buddy", "Groceries", "Language help", "Admin", "Sports"];

const StepLocation = () => {
  const [postalCode, setPostalCode] = useState("");
  const [distance, setDistance] = useState(10);
  const [activitySearch, setActivitySearch] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>(["Legal aid", "Buddy"]);

  const toggleActivity = (a: string) =>
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Where & what?</h2>
      <p className="text-sm text-muted-foreground mb-5">Almost done — just your location and interests</p>

      {/* Postal Code */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Your postal code</h3>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="e.g. 1011 AB"
            className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Distance Slider */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Max. travel distance</h3>
        <input
          type="range"
          min={0}
          max={50}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0 km</span>
          <span className="font-bold text-primary">{distance} km</span>
          <span>50+ km</span>
        </div>
      </div>

      {/* Activity Search */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Activities you're interested in</h3>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5 mb-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={activitySearch}
            onChange={(e) => setActivitySearch(e.target.value)}
            placeholder='Search activities (e.g. "legal", "language")'
            className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <p className="text-xs text-muted-foreground mb-2 font-medium">Suggested for you:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedActivities.map((a) => (
            <button
              key={a}
              onClick={() => toggleActivity(a)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedActivities.includes(a)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Map Preview Placeholder */}
      <div className="bg-muted rounded-xl p-6 text-center border-2 border-dashed border-border">
        <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Map preview — volunteer opportunities near you</p>
        <div className="flex justify-center gap-4 mt-3">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="w-3 h-3 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default StepLocation;
