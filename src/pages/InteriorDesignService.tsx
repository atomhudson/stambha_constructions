import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    Palette, Lightbulb, Sofa, Layers, Eye, Sparkles,
    Bath, Bed, ChefHat, Armchair, TreePine, ArrowRight, Phone
} from "lucide-react";

const designPhilosophy = [
    {
        icon: Lightbulb,
        title: "Visionary Concepts",
        description: "We begin with your lifestyle and preferences, crafting designs that reflect your personality and needs."
    },
    {
        icon: Palette,
        title: "Aesthetic Excellence",
        description: "Harmonious color palettes, textures, and materials that create stunning visual impact."
    },
    {
        icon: Layers,
        title: "Functional Design",
        description: "Beautiful spaces that are practical, ergonomic, and optimized for daily living."
    },
    {
        icon: Eye,
        title: "Attention to Detail",
        description: "From hardware finishes to lighting angles, every element is carefully considered."
    },
    {
        icon: Sofa,
        title: "Curated Furnishing",
        description: "Expert selection and sourcing of furniture, fixtures, and décor pieces."
    },
    {
        icon: Sparkles,
        title: "Turnkey Execution",
        description: "Complete design-to-installation service with skilled craftsmen and project management."
    },
];

const roomCategories = [
    { icon: Bed, title: "Bedrooms", description: "Restful retreats" },
    { icon: Armchair, title: "Living Rooms", description: "Elegant gathering spaces" },
    { icon: ChefHat, title: "Kitchens", description: "Modern culinary hubs" },
    { icon: Bath, title: "Bathrooms", description: "Spa-like sanctuaries" },
    { icon: TreePine, title: "Outdoor Spaces", description: "Terrace & garden design" },
];

const InteriorDesignService = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-20 relative">
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
                        >
                            <Palette className="w-4 h-4" />
                            Interior Design Services
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            <span className="text-foreground">Designing</span>
                            <br />
                            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Inspiring Spaces
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                            Transform your spaces into stunning reflections of your style.
                            Our design team creates interiors that are both beautiful and functional.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                            >
                                <Phone className="w-4 h-4" />
                                Book Consultation
                            </a>
                            <Link
                                to="/interior"
                                className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                View Portfolio
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Room Categories */}
                <section className="bg-secondary/30 py-16 mb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Room-by-Room <span className="text-accent">Expertise</span>
                            </h2>
                            <p className="text-muted-foreground">
                                Specialized design solutions for every space in your home
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {roomCategories.map((room, index) => {
                                const Icon = room.icon;
                                return (
                                    <motion.div
                                        key={room.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="h-full group hover:shadow-xl transition-all hover:-translate-y-2 border-2 hover:border-accent/30 bg-card/80">
                                            <CardContent className="p-5 text-center">
                                                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                                                    <Icon className="w-7 h-7 text-accent" />
                                                </div>
                                                <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                                                    {room.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {room.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Design Philosophy */}
                <section className="container mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Our Design <span className="text-accent">Philosophy</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We believe great interior design balances aesthetics with functionality,
                            creating spaces that look stunning and work perfectly for your lifestyle.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {designPhilosophy.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
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
                                                {item.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Design Process */}
                <section className="bg-secondary/50 py-16 mb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Our Design <span className="text-accent">Process</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: "01", title: "Consultation", desc: "Understanding your vision and requirements" },
                                { step: "02", title: "Concept", desc: "Mood boards, 3D renders, and material selection" },
                                { step: "03", title: "Execution", desc: "Skilled craftsmen bring designs to life" },
                                { step: "04", title: "Styling", desc: "Final touches and décor placement" },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="relative"
                                >
                                    <Card className="h-full bg-card border-2 hover:border-accent/30 transition-colors">
                                        <CardContent className="p-6 text-center">
                                            <div className="text-5xl font-heading font-bold text-accent/20 mb-3">
                                                {item.step}
                                            </div>
                                            <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </CardContent>
                                    </Card>
                                    {index < 3 && (
                                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="w-5 h-5 text-accent/40" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-6">
                    <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30" />
                        <CardContent className="p-8 md:p-12 text-center relative z-10">
                            <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                                Ready to Transform Your Space?
                            </h2>
                            <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-6">
                                Book a free design consultation and let's explore the possibilities for your home or office.
                            </p>
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Start Your Project
                            </a>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />

            <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default InteriorDesignService;
