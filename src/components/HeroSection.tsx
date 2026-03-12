import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Scale, HandHelping } from "lucide-react";

const roleCards = [
  { icon: Scale, label: "Legal", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { icon: Users, label: "Social", color: "bg-green-50 text-green-600 border-green-200" },
  { icon: Heart, label: "Buddy", color: "bg-amber-50 text-amber-600 border-amber-200" },
  { icon: HandHelping, label: "Occasional", color: "bg-rose-50 text-rose-600 border-rose-200" },
];

const steps = [
  { num: 1, label: "Tell us about yourself" },
  { num: 2, label: "We match you" },
  { num: 3, label: "Start making impact" },
];

const HeroSection = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 text-center"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="text-primary-foreground/70 text-sm mb-2">[ Hero illustration / photo ]</div>
        <h1 className="text-2xl font-bold text-primary-foreground leading-tight mb-4">
          Help refugees build<br />a new life in the Netherlands
        </h1>
      </motion.div>

      {/* Primary CTA */}
      <Link
        to="/signup"
        className="block w-full py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        I want to help
      </Link>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/what-we-do"
          className="py-3 rounded-xl border-2 border-border text-center font-semibold text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          What do we do?
        </Link>
        <Link
          to="/more-info"
          className="py-3 rounded-xl border-2 border-border text-center font-semibold text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          More information
        </Link>
      </div>

      {/* Role Finder */}
      <div>
        <h2 className="font-bold text-lg mb-3">Find Your Role</h2>
        <div className="grid grid-cols-2 gap-3">
          {roleCards.map((card) => (
            <motion.button
              key={card.label}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 ${card.color} transition-all hover:shadow-md`}
            >
              <card.icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{card.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3-Step Flow */}
      <div>
        <h2 className="font-bold text-lg mb-3">How it works</h2>
        <div className="grid grid-cols-3 gap-2">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-card border rounded-xl p-3 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2">
                {step.num}
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
