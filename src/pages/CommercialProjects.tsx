import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    Building2, Shield, Clock, TrendingUp, Users, BadgeCheck,
    Warehouse, Store, Factory, ArrowRight, Sparkles, Phone
} from "lucide-react";

const features = [
    {
        icon: TrendingUp,
        title: "Scalable Solutions",
        description: "From small retail spaces to large commercial complexes, we handle projects of any scale with precision."
    },
    {
        icon: Shield,
        title: "Code Compliance",
        description: "Full adherence to commercial building codes, fire safety regulations, and accessibility standards."
    },
    {
        icon: Clock,
        title: "Minimal Downtime",
        description: "Strategic planning ensures minimal disruption to your business operations during construction."
    },
    {
        icon: Users,
        title: "Expert Project Management",
        description: "Dedicated project managers coordinating all aspects from permits to final handover."
    },
    {
        icon: BadgeCheck,
        title: "Commercial-Grade Materials",
        description: "High-durability materials designed for heavy foot traffic and commercial use."
    },
    {
        icon: Building2,
        title: "Modern Infrastructure",
        description: "Smart building systems, energy efficiency, and future-ready infrastructure integration."
    },
];

const projectTypes = [
    { icon: Store, title: "Retail Spaces", description: "Showrooms, malls, and storefronts" },
    { icon: Building2, title: "Office Buildings", description: "Corporate offices and co-working spaces" },
    { icon: Warehouse, title: "Warehouses", description: "Storage facilities and logistics centers" },
    { icon: Factory, title: "Industrial", description: "Manufacturing units and factories" },
];

const CommercialProjects = () => {
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
                            <Building2 className="w-4 h-4" />
                            Commercial Construction
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            <span className="text-foreground">Building for</span>
                            <br />
                            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Business Success
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                            Commercial spaces that impress clients, boost productivity, and stand as a testament
                            to your brand's commitment to quality.
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
                                Discuss Your Project
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

                {/* Project Types */}
                <section className="bg-secondary/30 py-16 mb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Types of <span className="text-accent">Commercial Projects</span>
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {projectTypes.map((type, index) => {
                                const Icon = type.icon;
                                return (
                                    <motion.div
                                        key={type.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="h-full group hover:shadow-xl transition-all hover:-translate-y-2 border-2 hover:border-accent/30 bg-card/80">
                                            <CardContent className="p-6 text-center">
                                                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                                                    <Icon className="w-8 h-8 text-accent" />
                                                </div>
                                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                                                    {type.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {type.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
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
                            Why Partner With <span className="text-accent">Stambha</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We understand that commercial projects demand precision, speed, and zero compromise on quality.
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

                {/* Stats Section */}
                <section className="bg-secondary/50 py-12 mb-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "200+", label: "Commercial Projects" },
                                { value: "1M+", label: "Sq. Ft. Constructed" },
                                { value: "50+", label: "Corporate Clients" },
                                { value: "100%", label: "Code Compliance" },
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

                {/* CTA Section */}
                <section className="container mx-auto px-6">
                    <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30" />
                        <CardContent className="p-8 md:p-12 text-center relative z-10">
                            <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                                Let's Build Your Business Space
                            </h2>
                            <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-6">
                                From concept to completion, we deliver commercial spaces that elevate your brand and boost productivity.
                            </p>
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Request Proposal
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

export default CommercialProjects;
