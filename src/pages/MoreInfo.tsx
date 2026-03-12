import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";

const faqItems = [
  {
    title: "How volunteering works",
    content: "Sign up online, we review your profile, then we match you with a local team. You'll get an introduction and training before starting. The whole process typically takes 2–3 weeks.",
    defaultOpen: true,
  },
  {
    title: "Screening process",
    content: "All volunteers undergo a background check and a short interview. This ensures a safe environment for both volunteers and the people we support.",
  },
  {
    title: "Support for volunteers",
    content: "We provide training, coaching, and a buddy system for new volunteers. You'll have a coordinator available for any questions.",
  },
  {
    title: "Time commitment",
    content: "Most roles require 2–4 hours per week. We are flexible and can adapt to your schedule. Some roles are project-based.",
  },
  {
    title: "Types of refugees supported",
    content: "We work with asylum seekers, status holders, and undocumented individuals. Activities range from legal support to social activities.",
  },
  {
    title: "Frequently Asked Questions",
    content: "Do I need to speak Dutch? Not always. What training is provided? Depends on the role. Can I choose my schedule? Yes, we match your availability.",
  },
];

const MoreInfo = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="text-2xl font-bold mb-6">More Information</h1>

        <div className="space-y-2">
          {faqItems.map((item, i) => (
            <div key={item.title} className="border rounded-xl overflow-hidden bg-card">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="font-semibold text-sm">{item.title}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <Link
          to="/signup"
          className="block w-full mt-8 py-4 rounded-xl bg-primary text-primary-foreground text-center font-bold text-base"
        >
          Ready to start? Sign Up Now →
        </Link>
      </main>
    </MobileFrame>
  );
};

export default MoreInfo;
