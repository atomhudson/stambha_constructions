import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    RefreshCw, Shield, History, Sparkles, Wrench, Eye,
    Home, Building, Landmark, ArrowRight, Phone, CheckCircle2
} from "lucide-react";

const services = [
    {
        icon: Home,
        title: "Home Renovation",
        description: "Complete home makeovers including structural modifications, layout changes, and modernization of older properties."
    },
    {
        icon: Landmark,
        title: "Heritage Restoration",
        description: "Sensitive restoration of heritage buildings, preserving historical character while adding modern amenities."
    },
    {
        icon: Building,
        title: "Commercial Remodeling",
        description: "Upgrade your business space with modern designs, better layouts, and improved functionality."
    },
    {
        icon: Wrench,
        title: "Structural Repairs",
        description: "Foundation strengthening, waterproofing, crack repairs, and structural reinforcement for aging buildings."
    },
    {
        icon: RefreshCw,
        title: "Space Optimization",
        description: "Maximize usable space through smart redesigns, additions, and efficient layout planning."
    },
    {
        icon: Sparkles,
        title: "Modern Upgrades",
        description: "Add contemporary amenities like modular kitchens, smart home systems, and energy-efficient features."
    },
];

const whyRenovate = [
    "Increase property value significantly",
    "Improve energy efficiency and reduce bills",
    "Create more functional living spaces",
    "Update outdated designs and fixtures",
    "Address structural issues before they worsen",
    "Customize spaces for changing family needs",
];

const RenovationRestoration = () => {
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
                            <RefreshCw className="w-4 h-4" />
                            Renovation & Restoration
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            <span className="text-foreground">Revive &</span>
                            <br />
                            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Transform
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                            Breathe new life into existing structures. Whether it's a heritage building
                            needing careful restoration or a home ready for a modern makeover.
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
                                Get Renovation Quote
                            </a>
                            <Link
                                to="/interior"
                                className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                See Transformations
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Why Renovate Section */}
                <section className="bg-secondary/30 py-16 mb-20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                                    Why <span className="text-accent">Renovate</span> Your Property?
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Renovation is often more cost-effective than building new, and allows
                                    you to preserve what you love while updating what needs improvement.
                                </p>
                                <ul className="space-y-3">
                                    {whyRenovate.map((reason, index) => (
                                        <motion.li
                                            key={reason}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                            <span className="text-foreground">{reason}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {[
                                    { value: "300+", label: "Renovations Complete" },
                                    { value: "40+", label: "Heritage Projects" },
                                    { value: "95%", label: "Client Satisfaction" },
                                    { value: "25+", label: "Years Experience" },
                                ].map((stat) => (
                                    <Card key={stat.label} className="bg-card/80 border-2 hover:border-accent/30 transition-colors">
                                        <CardContent className="p-6 text-center">
                                            <div className="text-3xl font-heading font-bold text-accent mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="container mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Our Renovation <span className="text-accent">Services</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive renovation and restoration services for residential, commercial, and heritage properties.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.title}
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
                                                {service.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {service.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Before/After Concept */}
                <section className="bg-secondary/50 py-16 mb-20">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Eye className="w-12 h-12 mx-auto text-accent mb-4" />
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                                See the <span className="text-accent">Transformation</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                                Our renovation projects showcase dramatic before-and-after transformations.
                                Visit our interior portfolio to see how we've revitalized spaces across Delhi.
                            </p>
                            <Link
                                to="/interior"
                                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                            >
                                View Project Gallery
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-6">
                    <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30" />
                        <CardContent className="p-8 md:p-12 text-center relative z-10">
                            <History className="w-10 h-10 mx-auto mb-4 opacity-80" />
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                                Give Your Property a New Life
                            </h2>
                            <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-6">
                                Whether it's a complete renovation or targeted restoration, we'll help you
                                unlock your property's full potential.
                            </p>
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Request Site Visit
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

export default RenovationRestoration;
