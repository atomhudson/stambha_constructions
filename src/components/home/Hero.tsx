import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-40 left-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-primary/15 to-accent/5 blur-3xl"
      />

      {/* Large Background Text */}
      <motion.div 
        style={{ opacity }}
        className="absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[20vw] font-heading font-bold text-foreground/[0.03] leading-none tracking-tighter whitespace-nowrap">
          BUILD
        </span>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-32 lg:py-0">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2"
            >
              <span className="h-px w-12 bg-accent" />
              <span className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                Est. 1970
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
                <span className="block text-foreground">We Build</span>
                <span className="block text-foreground">What You</span>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-accent">Dream</span>
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="absolute -bottom-2 left-0 w-full h-4"
                    viewBox="0 0 200 20"
                    fill="none"
                  >
                    <motion.path
                      d="M0 15 Q50 0 100 12 T200 10"
                      stroke="hsl(var(--accent))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 1.2 }}
                    />
                  </motion.svg>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Three generations of excellence. From blueprint to reality, 
              we transform spaces with precision, passion, and timeless craftsmanship.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="group h-14 px-8 text-base bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Link to="/sites">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-full border-2 border-foreground/20 hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <MapPin className="mr-2 w-4 h-4" />
                  Explore Sites
                </Button>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex gap-12 pt-8 border-t border-border/50"
            >
              {[
                { value: "500+", label: "Projects" },
                { value: "54", label: "Years" },
                { value: "3", label: "Generations" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              {/* Placeholder gradient for construction image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/30 to-muted" />
              
              {/* Decorative Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="heroPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="currentColor" className="text-foreground" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#heroPattern)" />
                </svg>
              </div>

              {/* Abstract Shapes */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-primary/20 rounded-full"
              />

              {/* Central Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="w-24 h-24 rounded-2xl bg-background/90 backdrop-blur-sm shadow-2xl flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-accent" />
                </motion.div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 p-6 bg-card rounded-2xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">🏗️</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Trusted Builder</div>
                  <div className="text-sm text-muted-foreground">Since 1970</div>
                </div>
              </div>
            </motion.div>

            {/* Corner Decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-accent/30 rounded-tr-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-accent/40 flex justify-center pt-1"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], height: [4, 8, 4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-accent rounded-full"
          />
        </motion.div>
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
