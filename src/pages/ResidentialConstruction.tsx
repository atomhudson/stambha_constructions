import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    Home, Shield, Clock, Paintbrush, Users, BadgeCheck,
    Hammer, Ruler, Building, ArrowRight, Sparkles, Phone
} from "lucide-react";

const features = [
    {
        icon: Paintbrush,
        title: "Custom Designs",
        description: "Personalized floor plans and architectural designs tailored to your family's lifestyle and preferences."
    },
    {
        icon: Shield,
        title: "Premium Quality",
        description: "We use only the finest materials and certified construction practices for lasting durability."
    },
    {
        icon: Clock,
        title: "On-Time Delivery",
        description: "Strict project timelines with milestone tracking to ensure your home is ready when promised."
    },
    {
        icon: Users,
        title: "Dedicated Team",
        description: "Experienced architects, engineers, and craftsmen committed to building your dream home."
    },
    {
        icon: BadgeCheck,
        title: "Quality Assurance",
        description: "Multi-stage quality checks at every construction phase for flawless finishing."
    },
    {
        icon: Ruler,
        title: "Transparent Pricing",
        description: "Detailed cost breakdowns with no hidden charges. What you see is what you pay."
    },
];

const processSteps = [
    { step: "01", title: "Consultation", description: "Discuss your vision, budget, and requirements" },
    { step: "02", title: "Design", description: "Architectural plans and 3D visualization" },
    { step: "03", title: "Approval", description: "Permits, documentation, and final sign-off" },
    { step: "04", title: "Construction", description: "Expert execution with regular updates" },
    { step: "05", title: "Handover", description: "Final inspection and key delivery" },
];

const ResidentialConstruction = () => {
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
                            <Home className="w-4 h-4" />
                            Residential Construction
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            <span className="text-foreground">Building Your</span>
                            <br />
                            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Dream Home
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                            From foundation to finishing, we craft homes that stand the test of time.
                            Three generations of residential construction excellence in Delhi.
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
                                Get Free Quote
                            </a>
                            <Link
                                to="/interior"
                                className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                View Projects
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Stats Section */}
                <section className="bg-secondary/50 py-12 mb-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "500+", label: "Homes Built" },
                                { value: "50+", label: "Years Experience" },
                                { value: "98%", label: "Client Satisfaction" },
                                { value: "3", label: "Generations" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="container mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Why Choose Us for Your{" "}
                            <span className="text-accent">Home Construction</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We combine traditional craftsmanship with modern techniques to deliver homes that exceed expectations.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
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
                </section>

                {/* Process Section */}
                <section className="bg-secondary/30 py-20 mb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Our <span className="text-accent">Construction Process</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                A streamlined approach that keeps you informed at every stage
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-5 gap-4">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <Card className="h-full bg-card/80 hover:bg-card transition-colors border-2 hover:border-accent/30">
                                        <CardContent className="p-6 text-center">
                                            <div className="text-4xl font-heading font-bold text-accent/20 mb-2">
                                                {step.step}
                                            </div>
                                            <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </CardContent>
                                    </Card>
                                    {index < processSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="w-4 h-4 text-accent/40" />
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
                                Ready to Build Your Dream Home?
                            </h2>
                            <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-6">
                                Let's discuss your vision. Get a free consultation and detailed quote for your residential project.
                            </p>
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Schedule Consultation
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

export default ResidentialConstruction;
