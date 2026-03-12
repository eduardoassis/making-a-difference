import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, BookOpen, Users, AlertTriangle } from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import MobileFrame from "@/components/MobileFrame";

const activities = [
  {
    icon: Scale,
    title: "Legal Support",
    desc: "Help with asylum procedures & permits",
    color: "border-blue-200 bg-blue-50",
  },
  {
    icon: BookOpen,
    title: "Language & Integration",
    desc: "Dutch coaching, NT2 & buddy pairing",
    color: "border-emerald-200 bg-emerald-50",
  },
  {
    icon: Users,
    title: "Social Support",
    desc: "Mentor programme & community activities",
    color: "border-amber-200 bg-amber-50",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Help",
    desc: "Shelter, food & urgent needs",
    color: "border-red-200 bg-red-50",
  },
];

const WhatWeDo = () => {
  return (
    <MobileFrame>
      <StickyHeader />
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">What Do We Do?</h1>
        <p className="text-sm text-muted-foreground mb-6">
          We support refugees and newcomers in building a new life here.
        </p>

        <div className="space-y-4">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border-2 p-5 ${a.color}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <a.icon className="w-5 h-5" />
                <h3 className="font-bold text-base">{a.title}</h3>
              </div>
              <p className="text-sm text-foreground/70 mb-3">{a.desc}</p>
              <Link
                to="/signup"
                className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                Volunteer here →
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </MobileFrame>
  );
};

export default WhatWeDo;
