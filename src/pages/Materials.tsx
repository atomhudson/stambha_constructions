import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Building2, Paintbrush, Wrench, Zap, Droplets } from "lucide-react";

const categoryIcons: Record<string, any> = {
  Cement: Building2,
  Steel: Wrench,
  Tiles: Package,
  Bathroom: Droplets,
  Finishing: Paintbrush,
  Electrical: Zap,
};

const Materials = () => {
  const { data: materials, isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("*")
        .order("category");
      if (error) throw error;
      return data;
    },
  });

  const groupedMaterials = materials?.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = [];
    }
    acc[material.category].push(material);
    return acc;
  }, {} as Record<string, typeof materials>);

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
                Premium Materials
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We partner with India's most trusted brands to ensure quality and durability in every project
            </p>
          </motion.div>
        </section>

        {/* Brands Banner */}
        <section className="bg-secondary/50 py-12 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
              Trusted Brand Partners
            </h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["UltraTech", "TATA Tiscon", "Kajaria", "Kohler", "Asian Paints", "Havells"].map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-3 bg-background rounded-lg shadow-sm"
                >
                  <span className="text-lg font-heading font-bold text-accent">{brand}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials by Category */}
        <section className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {groupedMaterials && Object.entries(groupedMaterials).map(([category, items], categoryIndex) => {
                const Icon = categoryIcons[category] || Package;
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-foreground">{category}</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items?.map((material, index) => (
                        <motion.div
                          key={material.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-accent/20">
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                                    {material.name}
                                  </h3>
                                  <Badge variant="secondary" className="mt-1 text-xs">
                                    {material.brand}
                                  </Badge>
                                </div>
                                <Icon className="w-8 h-8 text-muted-foreground/30" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {material.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Quality Promise */}
        <section className="container mx-auto px-6 mt-20">
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Our Quality Promise
              </h2>
              <p className="text-accent-foreground/80 max-w-2xl mx-auto">
                Every material we use undergoes strict quality checks. We never compromise on materials because we know that the foundation of a lasting structure lies in the quality of its components.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Materials;
