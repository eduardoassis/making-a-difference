import { motion } from "framer-motion";
import { Search, Phone, Mail, MessageCircle, Star, Lightbulb, Users, HeartHandshake } from "lucide-react";

const signupSteps = ["Expertise", "Availability", "Languages", "Location", "Activities"];

const benefits = [
  { icon: HeartHandshake, label: "Make impact" },
  { icon: Lightbulb, label: "Expand skills" },
  { icon: Users, label: "Meet people" },
  { icon: Star, label: "Get support" },
];

const HomeBottomSections = () => {
  return (
    <div className="space-y-8 mt-8">
      {/* Signup Steps Preview */}
      <div>
        <h3 className="section-label mb-3">Signup Steps Preview</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {signupSteps.map((step, i) => (
            <div
              key={step}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border-2 border-primary/30 text-primary bg-accent whitespace-nowrap"
            >
              {i + 1}. {step}
            </div>
          ))}
        </div>
      </div>

      {/* Postal Code Search */}
      <div className="bg-card rounded-xl p-5 border shadow-sm">
        <h3 className="font-bold text-base mb-2">Find opportunities near you</h3>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">e.g. 1011 AB</span>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
            Search
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h3 className="font-bold text-base mb-3">What volunteers say</h3>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl p-5 border shadow-sm"
        >
          <p className="text-sm text-foreground italic mb-3">
            "Volunteering changed my life. I've met incredible people and learned so much about resilience."
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            — Maria, Buddy volunteer, Amsterdam
          </p>
        </motion.div>
        <div className="flex justify-center gap-1.5 mt-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
        </div>
      </div>

      {/* Benefits Grid */}
      <div>
        <h3 className="font-bold text-base mb-3">Why volunteer with us?</h3>
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((b) => (
            <div key={b.label} className="flex items-center gap-3 bg-card border rounded-xl p-4">
              <b.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-secondary text-secondary-foreground rounded-xl p-5">
        <h3 className="font-bold text-base mb-3">Questions? Contact us</h3>
        <div className="flex gap-3">
          {[
            { icon: Phone, label: "Phone" },
            { icon: Mail, label: "Email" },
            { icon: MessageCircle, label: "Chat" },
          ].map((c) => (
            <button
              key={c.label}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors"
            >
              <c.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBottomSections;
