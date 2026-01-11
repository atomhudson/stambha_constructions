import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import {
  Award,
  Users,
  Building,
  Calendar,
  Heart,
  Shield,
  Target,
  Sparkles,
  CheckCircle,
  Hammer,
  Eye,
  Handshake,
  Phone,
  Building2,
  MapPin,
  Quote,
  Linkedin,
  Mail
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Icon mapping for dynamic icons
const iconMap: Record<string, any> = {
  Award, Users, Building, Calendar, Heart, Shield, Target, Sparkles,
  CheckCircle, Hammer, Eye, Handshake, Phone, Building2, MapPin
};

// Fallback data
const fallbackTeam = [
  {
    id: "1",
    name: "Rajesh Kumar",
    designation: "Founder & Managing Director",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    description: "With over 35 years of experience in construction, Rajesh ji laid the foundation of Stambha Constructions.",
    quote: "Every brick we lay is a promise of trust and quality.",
    experience: "35+ Years",
    is_founder: true,
    linkedin_url: "",
    email: "",
  }
];

const fallbackMilestones = [
  { id: "1", year: "1970s", title: "The Foundation", description: "Our grandfather laid the first brick.", highlight: "Family Legacy Begins" },
  { id: "2", year: "Today", title: "Excellence Achieved", description: "500+ completed projects.", highlight: "500+ Projects" },
];

const fallbackAchievements = [
  { id: "1", value: "50+", label: "Years of Legacy", icon: "Calendar", description: "Three generations" },
  { id: "2", value: "500+", label: "Projects Completed", icon: "Building", description: "Residential & commercial" },
  { id: "3", value: "1000+", label: "Happy Families", icon: "Users", description: "Living in our creations" },
  { id: "4", value: "100%", label: "Client Satisfaction", icon: "Award", description: "Our proudest achievement" },
];

const fallbackValues = [
  { id: "1", icon: "Shield", title: "Integrity First", description: "Transparent pricing, honest timelines." },
  { id: "2", icon: "Hammer", title: "Master Craftsmanship", description: "Three generations of refined techniques." },
  { id: "3", icon: "Heart", title: "Client Relationships", description: "Many clients have become family friends." },
  { id: "4", icon: "Eye", title: "Attention to Detail", description: "We obsess over every corner and finish." },
];

// Team Member Card Component
const TeamMemberCard = ({ member, index }: { member: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group ${member.is_founder ? 'lg:col-span-2' : ''}`}
    >
      <div className={`
        relative rounded-3xl overflow-hidden border border-border/50 
        bg-card/80 backdrop-blur-sm
        hover:border-accent/40 transition-all duration-500
        hover:shadow-2xl hover:shadow-accent/10
        ${member.is_founder ? 'lg:flex' : ''}
      `}>
        {/* Image Section */}
        <div
          className={`relative overflow-hidden ${member.is_founder ? 'lg:w-2/5' : 'aspect-[4/3]'}`}
          style={{ transform: "translateZ(20px)" }}
        >
          <img
            src={member.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"}
            alt={member.name}
            className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent lg:bg-gradient-to-r" />

          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-accent-foreground border-0 shadow-lg">
              <Sparkles className="w-3 h-3 mr-1" />
              {member.experience}
            </Badge>
          </div>

          {member.is_founder && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground border-0 shadow-lg">
                <Award className="w-3 h-3 mr-1" />
                Founder
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div
          className={`relative p-6 lg:p-8 ${member.is_founder ? 'lg:w-3/5 lg:flex lg:flex-col lg:justify-center' : ''}`}
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="mb-4">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-1">
              {member.name}
            </h3>
            <p className="text-accent font-medium">{member.designation}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {member.description}
          </p>

          {member.quote && (
            <div className="relative pl-4 border-l-2 border-accent/30 mb-6">
              <Quote className="absolute -left-3 -top-1 w-6 h-6 text-accent/30 fill-accent/10" />
              <p className="text-foreground italic font-medium">
                "{member.quote}"
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {member.linkedin_url && (
              <motion.a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            )}
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
      </div>
    </motion.div>
  );
};

// Achievement Card
const AchievementCard = ({ stat, index }: { stat: any; index: number }) => {
  const Icon = iconMap[stat.icon] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative group text-center"
    >
      <div className="relative p-6 rounded-2xl bg-secondary/50 border border-border/30 hover:border-accent/30 transition-all duration-300">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1 font-heading">
          {stat.value}
        </div>
        <div className="text-sm font-medium text-foreground mb-1">
          {stat.label}
        </div>
        <div className="text-xs text-muted-foreground">
          {stat.description}
        </div>
      </div>
    </motion.div>
  );
};

// Value Card
const ValueCard = ({ value, index }: { value: any; index: number }) => {
  const Icon = iconMap[value.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="p-6 rounded-2xl bg-card/50 border border-border/30 hover:border-accent/30 transition-all duration-300 h-full">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-heading font-bold text-foreground mb-2">
          {value.title}
        </h4>
        <p className="text-sm text-muted-foreground">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
};

const Founder = () => {
  // Fetch team members
  const { data: dbTeam, isLoading: teamLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  // Fetch milestones
  const { data: dbMilestones, isLoading: milestonesLoading } = useQuery({
    queryKey: ["milestones"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("milestones")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  // Fetch achievements
  const { data: dbAchievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  // Fetch core values
  const { data: dbValues, isLoading: valuesLoading } = useQuery({
    queryKey: ["core-values"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("core_values")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  // Use database data or fallbacks
  const teamMembers = dbTeam && dbTeam.length > 0 ? dbTeam : fallbackTeam;
  const milestones = dbMilestones && dbMilestones.length > 0 ? dbMilestones : fallbackMilestones;
  const achievements = dbAchievements && dbAchievements.length > 0 ? dbAchievements : fallbackAchievements;
  const coreValues = dbValues && dbValues.length > 0 ? dbValues : fallbackValues;

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
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
            >
              <Building2 className="w-4 h-4" />
              Meet the Team Behind Your Dreams
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                Three Generations
              </span>
              <br />
              <span className="text-foreground">of Building Excellence</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What started as a humble construction business in the 1970s has grown into one of Delhi's most trusted names.
              Meet the people who make it all possible.
            </p>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Users className="w-3 h-3 mr-1" />
              Our Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              The <span className="text-accent">People</span> Behind Stambha
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each member brings decades of expertise and a shared commitment to excellence
            </p>
          </motion.div>

          {teamLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="relative py-16 mb-20">
          <div className="absolute inset-0 bg-secondary/30" />

          <div className="container mx-auto px-6 relative z-10">
            {achievementsLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-40 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((stat, index) => (
                  <AchievementCard key={stat.id} stat={stat} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Core Values */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Handshake className="w-3 h-3 mr-1" />
              Our Principles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Values We <span className="text-accent">Live By</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Principles passed down through three generations
            </p>
          </motion.div>

          {valuesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {coreValues.map((value, index) => (
                <ValueCard key={value.id} value={value} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Timeline Section */}
        <section id="journey" className="container mx-auto px-6 mb-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Calendar className="w-3 h-3 mr-1" />
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              A Journey of <span className="text-accent">50+ Years</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestonesLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 rounded-2xl" />
                ))}
              </div>
            ) : (
              milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-6 mb-10 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg shadow-accent/20">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-3" />
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    {milestone.highlight && (
                      <Badge className="mb-2 bg-primary/10 text-primary border-0">
                        {milestone.highlight}
                      </Badge>
                    )}
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-2">{milestone.year}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 py-16 px-8 md:py-20 md:px-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <Handshake className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to Build Your Dream?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Let's discuss your project. With 50+ years of family expertise,
                we're committed to turning your vision into reality.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="tel:+919999999999"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-accent font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </motion.a>
                <motion.a
                  href="/interior"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur border-2 border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  <Eye className="w-5 h-5" />
                  View Our Work
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </div>
  );
};

export default Founder;
