import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    MessageSquare, FileText, Calculator, Scale, Lightbulb, Users,
    ClipboardCheck, TrendingUp, Shield, ArrowRight, Phone, Sparkles
} from "lucide-react";

const services = [
    {
        icon: FileText,
        title: "Project Feasibility",
        description: "Comprehensive analysis of your construction project's viability, including site assessment and technical requirements."
    },
    {
        icon: Calculator,
        title: "Budget Planning",
        description: "Detailed cost estimation and budget optimization strategies to maximize value within your financial constraints."
    },
    {
        icon: Scale,
        title: "Regulatory Compliance",
        description: "Navigate building codes, zoning laws, and permit requirements with our expert guidance."
    },
    {
        icon: ClipboardCheck,
        title: "Quality Audits",
        description: "Third-party quality inspections and construction audits to ensure standards are met."
    },
    {
        icon: Lightbulb,
        title: "Design Advisory",
        description: "Expert input on architectural designs, material selection, and space optimization."
    },
    {
        icon: TrendingUp,
        title: "Investment Analysis",
        description: "ROI projections, market analysis, and property valuation for real estate investments."
    },
];

const consultingProcess = [
    { step: "01", title: "Initial Discussion", description: "Understanding your needs and project scope" },
    { step: "02", title: "Site Assessment", description: "On-ground evaluation and documentation" },
    { step: "03", title: "Analysis & Report", description: "Detailed findings and recommendations" },
    { step: "04", title: "Action Plan", description: "Clear roadmap for implementation" },
];

const Consultancy = () => {
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
                            <MessageSquare className="w-4 h-4" />
                            Construction Consultancy
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            <span className="text-foreground">Expert</span>
                            <br />
                            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Guidance
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                            Leverage 50+ years of construction expertise for your project.
                            Get unbiased advice, feasibility analysis, and strategic planning from industry veterans.
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
                                to="/founder"
                                className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                Our Expertise
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Why Consult Section */}
                <section className="bg-secondary/30 py-16 mb-20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                                    Why <span className="text-accent">Consult</span> With Us?
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Construction is a significant investment. Our consultancy services help you
                                    make informed decisions, avoid costly mistakes, and ensure your project's success.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: Shield, text: "Unbiased third-party perspective" },
                                        { icon: Users, text: "50+ years of combined expertise" },
                                        { icon: TrendingUp, text: "Save money with optimized planning" },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.text}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="text-foreground font-medium">{item.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-card border-2 border-accent/20">
                                    <CardContent className="p-8">
                                        <Sparkles className="w-10 h-10 text-accent mb-4" />
                                        <h3 className="text-2xl font-heading font-bold mb-4">Free Initial Consultation</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Schedule a no-obligation discussion to explore how we can help with your project.
                                            We'll listen to your needs and provide initial insights.
                                        </p>
                                        <a
                                            href="/#contact"
                                            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Schedule Now
                                        </a>
                                    </CardContent>
                                </Card>
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
                            Consultancy <span className="text-accent">Services</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Expert guidance across all aspects of construction planning and execution.
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

                {/* Process Section */}
                <section className="bg-secondary/50 py-16 mb-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Our Consulting <span className="text-accent">Process</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {consultingProcess.map((item, index) => (
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
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                    {index < consultingProcess.length - 1 && (
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
                            <MessageSquare className="w-10 h-10 mx-auto mb-4 opacity-80" />
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                                Have Questions About Your Project?
                            </h2>
                            <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-6">
                                Get expert answers and strategic guidance. Schedule a consultation with our
                                experienced team today.
                            </p>
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Talk to an Expert
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

export default Consultancy;
