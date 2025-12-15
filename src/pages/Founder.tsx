import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Award, Users, Building, Calendar } from "lucide-react";

const milestones = [
  { year: "1970s", title: "Foundation", description: "Our grandfather laid the foundation of this family business in Delhi" },
  { year: "1990s", title: "Growth", description: "Second generation expanded operations across Delhi NCR" },
  { year: "2012", title: "New Era", description: "Current leadership with modern techniques and traditional values" },
  { year: "Today", title: "Excellence", description: "500+ completed projects with 100% client satisfaction" },
];

const Founder = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Three Generations
                </span>
                <br />
                <span className="text-foreground">of Building Trust</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                What started as a humble construction business in the 1970s has grown into one of Delhi's most trusted names in construction. Our journey spans over five decades, with each generation adding their expertise while maintaining our core values of quality, honesty, and dedication.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, with 12 years of personal hands-on experience, we combine time-tested construction methods with modern innovations. Every brick we lay carries the weight of our family's reputation and the promise of excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-3xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Building className="w-24 h-24 mx-auto text-accent mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-foreground">Stumbh Constructions</h3>
                  <p className="text-muted-foreground">Family Business Since 1970s</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-secondary/50 py-16 mb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Calendar, value: "50+", label: "Years Legacy" },
                { icon: Building, value: "500+", label: "Projects" },
                { icon: Users, value: "1000+", label: "Happy Families" },
                { icon: Award, value: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-10 h-10 mx-auto text-accent mb-3" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-center mb-12"
          >
            Our <span className="text-accent">Journey</span>
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{milestone.year}</p>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Founder;
