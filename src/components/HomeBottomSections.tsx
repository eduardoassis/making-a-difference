import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Mail, MessageCircle, Star, Lightbulb, Users, HeartHandshake, MapPin, Clock, Scale, GraduationCap, ShoppingCart, Heart, ThumbsUp, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import FakeMap from "./FakeMap";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 1500;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById(`counter-${target}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span id={`counter-${target}`} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const TestimonialCarousel = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const testimonials = [
    { text: t("home.testimonial"), author: t("home.testimonialAuthor") },
    { text: t("home.testimonial2"), author: t("home.testimonialAuthor2") },
    { text: t("home.testimonial3"), author: t("home.testimonialAuthor3") },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const toggleLike = (i: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div>
      <h3 className="font-bold text-base mb-3">{t("home.volunteersSay")}</h3>
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((item, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <div className="bg-card rounded-xl p-5 border shadow-sm mx-1">
                <p className="text-sm text-foreground italic mb-3">{item.text}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">{item.author}</p>
                  <motion.button
                    whileTap={{ scale: 1.3 }}
                    onClick={() => toggleLike(i)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
                      liked.has(i)
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <motion.div
                      animate={liked.has(i) ? { scale: [1, 1.4, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </motion.div>
                    {liked.has(i) && <Sparkles className="w-2.5 h-2.5" />}
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "bg-primary w-6" : "bg-border w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const HomeBottomSections = () => {
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [savedOpps, setSavedOpps] = useState<Set<number>>(new Set());
  const { t } = useTranslation();

  const toggleSave = (i: number) => {
    setSavedOpps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const mockOpportunities = [
    { icon: Scale, title: t("home.opp.legalTitle"), location: "Amsterdam Centrum", distance: "1.2 km", slots: 3, urgent: true },
    { icon: Heart, title: t("home.opp.buddyTitle"), location: "Amsterdam West", distance: "2.5 km", slots: 5, urgent: false },
    { icon: GraduationCap, title: t("home.opp.dutchTitle"), location: "Amsterdam Zuid", distance: "3.1 km", slots: 2, urgent: false },
    { icon: ShoppingCart, title: t("home.opp.groceryTitle"), location: "Amsterdam Oost", distance: "1.8 km", slots: 8, urgent: true },
    { icon: Users, title: t("home.opp.youthTitle"), location: "Amsterdam Noord", distance: "4.2 km", slots: 1, urgent: false },
  ];

  const signupSteps = [
    t("home.expertise"), t("home.availability"), t("home.languages"), t("home.location"), t("home.activities")
  ];

  const benefits = [
    { icon: HeartHandshake, label: t("home.makeImpact"), stat: 500, statSuffix: "+" },
    { icon: Lightbulb, label: t("home.expandSkills"), stat: 30, statSuffix: "+" },
    { icon: Users, label: t("home.meetPeople"), stat: 1200, statSuffix: "+" },
    { icon: Star, label: t("home.getSupport"), stat: 98, statSuffix: "%" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* Signup steps - interactive chips */}
      <div>
        <h3 className="section-label mb-3">{t("home.signupPreview")}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {signupSteps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border-2 border-primary/30 text-primary bg-accent whitespace-nowrap cursor-default"
            >
              {i + 1}. {step}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search with save functionality */}
      <div className="bg-card rounded-xl p-5 border shadow-sm">
        <h3 className="font-bold text-base mb-2">{t("home.findNearYou")}</h3>
        <div className="flex gap-2 mb-1">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={t("home.postalPlaceholder")}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchSubmitted(true)}
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
          >
            {t("home.search")}
          </motion.button>
        </div>

        <AnimatePresence>
          {searchSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FakeMap className="h-48" />
              </motion.div>

              <p className="text-xs text-muted-foreground font-medium">
                {t("home.opp.resultsFound", { count: mockOpportunities.length, postal: postalCode || "1011 AB" })}
              </p>
              {mockOpportunities.map((opp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:border-primary/40 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <opp.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground truncate">{opp.title}</span>
                      {opp.urgent && (
                        <motion.span
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-destructive/10 text-destructive flex-shrink-0"
                        >
                          {t("home.opp.urgent")}
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {opp.location}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {opp.distance}
                      </span>
                    </div>
                    <p className="text-xs text-primary/80 font-medium mt-1">
                      {t("home.opp.slotsAvailable", { count: opp.slots })}
                    </p>
                  </div>
                  {/* Save/bookmark button */}
                  <motion.button
                    whileTap={{ scale: 1.3 }}
                    onClick={(e) => { e.stopPropagation(); toggleSave(i); }}
                    className="mt-1 flex-shrink-0"
                  >
                    <motion.div
                      animate={savedOpps.has(i) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          savedOpps.has(i) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  </motion.button>
                </motion.div>
              ))}
              <button className="w-full text-center text-sm font-semibold text-primary py-2 rounded-lg border border-primary/20 hover:bg-accent transition-colors">
                {t("home.opp.viewAll")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TestimonialCarousel />

      {/* Benefits with animated counters */}
      <div>
        <h3 className="font-bold text-base mb-3">{t("home.whyVolunteer")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2 bg-card border rounded-xl p-4 text-center cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <b.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-xl font-black text-foreground">
                <AnimatedCounter target={b.stat} suffix={b.statSuffix} />
              </span>
              <span className="text-xs font-medium text-muted-foreground">{b.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact with hover effects */}
      <div className="bg-secondary text-secondary-foreground rounded-xl p-5">
        <h3 className="font-bold text-base mb-3">{t("home.contactUs")}</h3>
        <div className="flex gap-3">
          {[
            { icon: Phone, label: t("home.phone") },
            { icon: Mail, label: t("home.email") },
            { icon: MessageCircle, label: t("home.chat") },
          ].map((c) => (
            <motion.button
              key={c.label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors"
            >
              <c.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{c.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBottomSections;
