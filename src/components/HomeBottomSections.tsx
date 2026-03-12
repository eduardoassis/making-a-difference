import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Mail, MessageCircle, Star, Lightbulb, Users, HeartHandshake, MapPin, Clock, Scale, GraduationCap, ShoppingCart, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";

const TestimonialCarousel = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <div>
      <h3 className="font-bold text-base mb-3">{t("home.volunteersSay")}</h3>
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((item, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <div className="bg-card rounded-xl p-5 border shadow-sm mx-1">
                <p className="text-sm text-foreground italic mb-3">{item.text}</p>
                <p className="text-xs text-muted-foreground font-medium">{item.author}</p>
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
            className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
};

const HomeBottomSections = () => {
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const { t } = useTranslation();

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
    { icon: HeartHandshake, label: t("home.makeImpact") },
    { icon: Lightbulb, label: t("home.expandSkills") },
    { icon: Users, label: t("home.meetPeople") },
    { icon: Star, label: t("home.getSupport") },
  ];

  return (
    <div className="space-y-8 mt-8">
      <div>
        <h3 className="section-label mb-3">{t("home.signupPreview")}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {signupSteps.map((step, i) => (
            <div key={step} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border-2 border-primary/30 text-primary bg-accent whitespace-nowrap">
              {i + 1}. {step}
            </div>
          ))}
        </div>
      </div>

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
          <button
            onClick={() => setSearchSubmitted(true)}
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
          >
            {t("home.search")}
          </button>
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
              {/* Fake Map Preview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border"
              >
                {/* Map Grid Lines */}
                <div className="absolute inset-0 opacity-30">
                  <div className="h-full w-full" style={{
                    backgroundImage: `
                      linear-gradient(to right, #0d9488 1px, transparent 1px),
                      linear-gradient(to bottom, #0d9488 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Water/Canals */}
                <div className="absolute top-4 left-8 right-16 h-3 bg-cyan-200/60 rounded-full transform rotate-12" />
                <div className="absolute bottom-8 left-4 w-3 h-20 bg-cyan-200/60 rounded-full transform -rotate-6" />
                <div className="absolute top-12 right-12 w-2 h-16 bg-cyan-200/60 rounded-full transform rotate-45" />
                
                {/* Parks/Green Areas */}
                <div className="absolute bottom-4 right-8 w-16 h-12 bg-emerald-200/50 rounded-xl" />
                <div className="absolute top-8 left-20 w-10 h-8 bg-emerald-200/50 rounded-lg" />
                
                {/* Streets */}
                <div className="absolute top-0 left-1/3 w-1 h-full bg-white/60" />
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/60" />
                <div className="absolute top-1/4 left-1/4 w-20 h-0.5 bg-white/50 transform rotate-45" />
                
                {/* Opportunity Pins */}
                <div className="absolute top-16 left-24">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                    <Scale className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </div>
                
                <div className="absolute bottom-20 left-12">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                    <Heart className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </div>
                
                <div className="absolute top-24 right-20">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                    <GraduationCap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </div>
                
                <div className="absolute bottom-12 right-16">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-destructive rotate-45" />
                  <span className="absolute -top-2 -right-1 w-4 h-4 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">!</span>
                </div>
                
                <div className="absolute top-8 right-8">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </div>
                
                {/* Map Label */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                  <p className="text-[10px] font-semibold text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    Amsterdam • {mockOpportunities.length} {t("home.opp.locations")}
                  </p>
                </div>
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
                  className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:border-primary/40 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <opp.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground truncate">{opp.title}</span>
                      {opp.urgent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-destructive/10 text-destructive flex-shrink-0">
                          {t("home.opp.urgent")}
                        </span>
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

      <div>
        <h3 className="font-bold text-base mb-3">{t("home.whyVolunteer")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((b) => (
            <div key={b.label} className="flex items-center gap-3 bg-card border rounded-xl p-4">
              <b.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-secondary text-secondary-foreground rounded-xl p-5">
        <h3 className="font-bold text-base mb-3">{t("home.contactUs")}</h3>
        <div className="flex gap-3">
          {[
            { icon: Phone, label: t("home.phone") },
            { icon: Mail, label: t("home.email") },
            { icon: MessageCircle, label: t("home.chat") },
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
