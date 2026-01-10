import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Crown, ShieldCheck, Clock, Wallet, BadgeCheck, Eye,
  Star, Hammer, Heart, Users, ThumbsUp, Sparkles
} from "lucide-react";

const iconMap: Record<string, any> = {
  crown: Crown,
  "shield-check": ShieldCheck,
  clock: Clock,
  wallet: Wallet,
  "badge-check": BadgeCheck,
  eye: Eye,
  star: Star,
  hammer: Hammer,
  heart: Heart,
  users: Users,
  "thumbs-up": ThumbsUp,
  sparkles: Sparkles,
};

const Unique = () => {
  const { data: features, isLoading } = useQuery({
    queryKey: ["unique-features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unique_features")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover what makes Stambha Constructions the preferred choice for families across Delhi
            </p>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 mb-20">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features?.map((feature, index) => {
                const Icon = iconMap[feature.icon || "star"] || Star;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full group hover:shadow-xl transition-all hover:-translate-y-2 border-2 hover:border-accent/30 bg-card/50">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                          <Icon className="w-7 h-7 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Testimonial Section */}
        <section className="bg-secondary/50 py-16 mb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-foreground font-medium mb-6 italic">
                "Stambha Constructions transformed our house into a dream home. Their attention to detail and commitment to quality is unmatched. The team was professional, transparent, and delivered on time."
              </blockquote>
              <div className="text-muted-foreground">
                <span className="font-semibold text-foreground">Rajesh Kumar</span>
                <span className="mx-2">•</span>
                <span>South Delhi</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <CardContent className="p-8 md:p-12 text-center relative z-10">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Ready to Build Your Dream?
              </h2>
              <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-6">
                Join hundreds of satisfied families who trusted us with their most important investment. Get a free consultation today.
              </p>
              <a 
                href="/#contact" 
                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
              >
                Get Free Quote
              </a>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Unique;
