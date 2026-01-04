import { motion } from "framer-motion";
import { Bath, Bed, Coffee, ChefHat, Home, Armchair, TreePine, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Bath,
    title: "Bathroom",
    description: "Luxury spa-like bathrooms with modern fixtures and elegant designs",
    color: "hsl(200, 70%, 50%)",
  },
  {
    icon: Bed,
    title: "Bedroom",
    description: "Comfortable sanctuaries designed for rest and relaxation",
    color: "hsl(280, 60%, 60%)",
  },
  {
    icon: Coffee,
    title: "Dining",
    description: "Sophisticated dining spaces perfect for family gatherings",
    color: "hsl(30, 70%, 55%)",
  },
  {
    icon: ChefHat,
    title: "Kitchen",
    description: "Functional and beautiful kitchens built for culinary excellence",
    color: "hsl(15, 65%, 55%)",
  },
  {
    icon: Home,
    title: "Facade",
    description: "Stunning exterior designs that make lasting first impressions",
    color: "hsl(220, 60%, 50%)",
  },
  {
    icon: Armchair,
    title: "Living Room",
    description: "Inviting spaces where families create lasting memories",
    color: "hsl(140, 50%, 45%)",
  },
  {
    icon: TreePine,
    title: "Terrace",
    description: "Outdoor retreats with breathtaking views and cozy ambiance",
    color: "hsl(100, 60%, 50%)",
  },
];

const Services = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-cyan-400 font-semibold tracking-[0.2em] uppercase text-xs mb-6 px-4 py-2 bg-cyan-400/10 rounded-full border border-cyan-400/20">
            Our Expertise
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Crafting Perfection
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              In Every Detail
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transforming every corner of your home with precision craftsmanship and innovative design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="group relative h-full cursor-pointer">
                {/* Animated gradient border */}
                <div 
                  className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}, transparent, ${service.color})`,
                  }}
                />
                
                {/* Main card */}
                <div className="relative h-full bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  {/* Floating gradient orb */}
                  <div 
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                    style={{ backgroundColor: service.color }}
                  />
                  
                  <div className="relative p-8 h-full flex flex-col z-10">
                    {/* Icon container with animated background */}
                    <div className="relative mb-6 w-fit">
                      <div 
                        className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"
                        style={{ backgroundColor: service.color }}
                      />
                      <div 
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ 
                          background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)`,
                          border: `1px solid ${service.color}30`
                        }}
                      >
                        <service.icon 
                          className="w-8 h-8 transition-all duration-500 group-hover:scale-110" 
                          style={{ color: service.color }}
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow space-y-3">
                      <h3 className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Animated arrow indicator */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3" style={{ color: service.color }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div 
                      className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${service.color}15, transparent)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
