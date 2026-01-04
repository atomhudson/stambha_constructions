import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bath, Bed, Coffee, ChefHat, Home, Armchair, TreePine, ArrowRight } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: Bath,
    title: "Bathroom",
    description: "Luxury spa-like bathrooms with modern fixtures and elegant tile work",
    image: "🛁",
    accent: "from-amber-600/20 to-orange-500/20",
  },
  {
    icon: Bed,
    title: "Bedroom",
    description: "Comfortable sanctuaries designed for rest and relaxation",
    image: "🛏️",
    accent: "from-stone-500/20 to-amber-600/20",
  },
  {
    icon: Coffee,
    title: "Dining",
    description: "Sophisticated dining spaces perfect for family gatherings",
    image: "🍽️",
    accent: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: ChefHat,
    title: "Kitchen",
    description: "Functional and beautiful kitchens built for culinary excellence",
    image: "👨‍🍳",
    accent: "from-amber-500/20 to-yellow-600/20",
  },
  {
    icon: Home,
    title: "Facade",
    description: "Stunning exterior designs that make lasting first impressions",
    image: "🏠",
    accent: "from-stone-600/20 to-stone-400/20",
  },
  {
    icon: Armchair,
    title: "Living Room",
    description: "Inviting spaces where families create lasting memories",
    image: "🛋️",
    accent: "from-amber-700/20 to-orange-600/20",
  },
  {
    icon: TreePine,
    title: "Terrace",
    description: "Outdoor retreats with breathtaking views and cozy ambiance",
    image: "🌿",
    accent: "from-emerald-600/20 to-amber-500/20",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative cursor-pointer"
    >
      {/* Card glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative h-full bg-card border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-2xl group-hover:shadow-accent/10">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Content container */}
        <div className="relative p-8 h-full flex flex-col" style={{ transform: "translateZ(30px)" }}>
          {/* Top row - icon and emoji */}
          <div className="flex items-start justify-between mb-6">
            <motion.div 
              className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              whileHover={{ rotate: 6 }}
            >
              <service.icon className="w-7 h-7 text-accent" />
            </motion.div>
            
            <motion.span 
              className="text-4xl opacity-30 group-hover:opacity-60 group-hover:scale-125 transition-all duration-300"
              style={{ transform: "translateZ(40px)" }}
            >
              {service.image}
            </motion.span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
            {service.description}
          </p>

          {/* Bottom action */}
          <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">
              Learn more
            </span>
            <motion.div 
              className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
              whileHover={{ scale: 1.1, x: 3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/30 rounded-tr-xl" />
        </div>

        {/* Bottom shimmer */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
              Our Expertise
            </span>
            <span className="h-px w-8 bg-accent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Crafting </span>
            <span className="text-accent">Perfection</span>
            <br />
            <span className="text-foreground">In Every Detail</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            From cozy bedrooms to stunning facades, we transform every corner 
            of your home with precision and passion.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-full border border-accent/20 hover:border-accent/40 transition-all duration-300"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
