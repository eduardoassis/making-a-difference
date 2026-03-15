import { motion, AnimatePresence } from "framer-motion";

interface FloatingXPProps {
  show: boolean;
  amount: number;
}

const FloatingXP = ({ show, amount }: FloatingXPProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.3, y: 30 }}
            animate={{ scale: [0.3, 1.6, 1.2], y: [30, -20, -50] }}
            exit={{ scale: 0, y: -80, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-black text-primary drop-shadow-lg"
          >
            +{amount} XP
          </motion.div>
          {/* Particle ring */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 6) * 60,
                y: Math.sin((i * Math.PI * 2) / 6) * 60 - 20,
              }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingXP;
