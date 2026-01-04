import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Building2, Award, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface BuildingBlock {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  baseX: number;
  baseY: number;
  color: string;
  delay: number;
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buildings, setBuildings] = useState<BuildingBlock[]>([]);
  const animationRef = useRef<number>();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize building blocks
  useEffect(() => {
    const initBuildings = () => {
      const blocks: BuildingBlock[] = [];
      const colors = [
        'rgba(139, 115, 85, 0.3)',  // accent
        'rgba(201, 181, 156, 0.25)', // primary
        'rgba(184, 168, 136, 0.2)',  // muted
        'rgba(217, 207, 199, 0.15)', // light
      ];
      
      // Create a cityscape of buildings
      const buildingCount = 25;
      for (let i = 0; i < buildingCount; i++) {
        const baseX = (i / buildingCount) * window.innerWidth;
        const width = 40 + Math.random() * 80;
        const height = 100 + Math.random() * 300;
        const baseY = window.innerHeight - height + 50;
        
        blocks.push({
          id: i,
          x: baseX,
          y: baseY,
          baseX: baseX,
          baseY: baseY,
          width: width,
          height: height,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
        });
      }
      
      // Add floating geometric shapes
      for (let i = 0; i < 15; i++) {
        const baseX = Math.random() * window.innerWidth;
        const baseY = Math.random() * window.innerHeight * 0.7;
        const size = 20 + Math.random() * 60;
        
        blocks.push({
          id: buildingCount + i,
          x: baseX,
          y: baseY,
          baseX: baseX,
          baseY: baseY,
          width: size,
          height: size,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 3,
        });
      }
      
      setBuildings(blocks);
    };

    initBuildings();
    window.addEventListener('resize', initBuildings);
    return () => window.removeEventListener('resize', initBuildings);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      buildings.forEach((block, index) => {
        // Calculate distance from mouse
        const dx = mousePos.x - block.baseX;
        const dy = mousePos.y - block.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;
        
        // Repel effect - blocks move away from cursor
        let offsetX = 0;
        let offsetY = 0;
        let scale = 1;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 50;
          offsetX = -(dx / distance) * force;
          offsetY = -(dy / distance) * force;
          scale = 1 + (1 - distance / maxDistance) * 0.1; // Slight zoom
        }
        
        // Floating animation
        const time = Date.now() / 1000;
        const floatY = Math.sin(time + block.delay) * 5;
        const floatX = Math.cos(time * 0.5 + block.delay) * 3;
        
        // Smooth interpolation
        block.x += (block.baseX + offsetX + floatX - block.x) * 0.1;
        block.y += (block.baseY + offsetY + floatY - block.y) * 0.1;

        ctx.save();
        ctx.translate(block.x + block.width / 2, block.y + block.height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-block.width / 2, -block.height / 2);
        
        // Draw building/shape
        ctx.fillStyle = block.color;
        ctx.beginPath();
        
        if (index < 25) {
          // Building shape with rounded top
          ctx.roundRect(0, 0, block.width, block.height, [8, 8, 0, 0]);
          
          // Windows
          ctx.fill();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          const windowSize = 8;
          const windowGap = 15;
          const windowsPerRow = Math.floor((block.width - 10) / windowGap);
          const windowRows = Math.floor((block.height - 20) / windowGap);
          
          for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < windowsPerRow; col++) {
              const wx = 10 + col * windowGap;
              const wy = 10 + row * windowGap;
              ctx.fillRect(wx, wy, windowSize, windowSize);
            }
          }
        } else {
          // Geometric floating shapes
          if (index % 3 === 0) {
            // Circle
            ctx.arc(block.width / 2, block.height / 2, block.width / 2, 0, Math.PI * 2);
          } else if (index % 3 === 1) {
            // Rounded square
            ctx.roundRect(0, 0, block.width, block.height, 10);
          } else {
            // Triangle
            ctx.moveTo(block.width / 2, 0);
            ctx.lineTo(block.width, block.height);
            ctx.lineTo(0, block.height);
            ctx.closePath();
          }
          ctx.fill();
        }
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [buildings, mousePos]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" style={{ zIndex: 2 }} />
      
      {/* Bottom Fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" style={{ zIndex: 3 }} />

      {/* Main Content */}
      <div className="container mx-auto px-6 relative py-24 lg:py-0" style={{ zIndex: 10 }}>
        <div className="max-w-4xl">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-background/80 backdrop-blur-md rounded-full shadow-lg border border-accent/20 mb-8"
          >
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-accent" 
            />
            <span className="text-sm font-semibold text-accent tracking-wide">
              Building Excellence Since 1970
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.95] tracking-tight mb-6"
          >
            <span className="block text-foreground drop-shadow-sm">
              Crafting Your
            </span>
            <motion.span 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="block mt-2 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
            >
              Dream Spaces
            </motion.span>
          </motion.h1>
          
          {/* Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="h-1.5 w-32 bg-gradient-to-r from-accent to-primary rounded-full origin-left mb-8"
          />
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            Transform your vision into architectural masterpieces. We blend innovative design 
            with structural excellence to create spaces that inspire, endure, and tell your unique story.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="h-16 px-10 text-lg bg-accent hover:bg-accent/90 text-white shadow-2xl shadow-accent/30 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300 rounded-2xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="h-16 px-10 text-lg border-2 border-foreground/20 hover:border-accent hover:bg-accent/5 text-foreground transition-all duration-300 rounded-2xl backdrop-blur-sm group"
            >
              <span className="flex items-center gap-2">
                View Our Work
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <Link to="/sites">
              <Button 
                size="lg" 
                variant="ghost"
                className="h-16 px-8 text-lg text-foreground hover:bg-accent/10 transition-all duration-300 rounded-2xl group"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Explore Sites
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl"
          >
            {[
              { value: "500+", label: "Projects Delivered", icon: Building2 },
              { value: "54", label: "Years of Excellence", icon: Award },
              { value: "100%", label: "Client Satisfaction", icon: Star },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-4 md:p-6 rounded-2xl bg-background/60 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl hover:bg-background/80 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <stat.icon className="w-5 h-5 text-accent mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 20 }}
      >
        <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-accent/40 flex items-start justify-center p-1 bg-background/50 backdrop-blur-sm"
        >
          <motion.div 
            animate={{ height: [4, 12, 4], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
