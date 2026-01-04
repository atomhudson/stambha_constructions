import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet.heat";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { MapPin, Building2, Calendar, CheckCircle, Clock, Compass } from "lucide-react";

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

type Project = Database["public"]["Tables"]["projects"]["Row"];

const Sites = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "ongoing" | "planned">("all");

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .not("latitude", "is", null)
        .not("longitude", "is", null);

      if (!error && data) {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize map centered on Delhi
    const map = L.map(mapContainer.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([28.6139, 77.2090], 11);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Use CartoDB Positron for clean look
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || projects.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstance.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Filter projects based on selection
    const filteredProjects = filter === "all" 
      ? projects 
      : projects.filter(p => p.status === filter);

    // Custom marker icons based on status
    const createCustomIcon = (status: string) => {
      const colors: Record<string, string> = {
        completed: '#22c55e',
        ongoing: '#3b82f6',
        planned: '#8b7355',
      };
      const color = colors[status] || colors.planned;
      
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${color};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(45deg);
              width: 10px;
              height: 10px;
              background: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    };

    // Add markers
    filteredProjects.forEach((project) => {
      if (project.latitude && project.longitude) {
        const marker = L.marker([project.latitude, project.longitude], {
          icon: createCustomIcon(project.status || 'planned')
        }).addTo(mapInstance.current!);
        
        marker.bindPopup(`
          <div style="padding: 8px; min-width: 180px; font-family: inherit;">
            <h3 style="font-weight: 600; font-size: 13px; margin: 0 0 4px 0; color: #333;">${project.title}</h3>
            <p style="font-size: 11px; color: #666; margin: 0 0 6px 0;">${project.address}</p>
            <span style="
              display: inline-block;
              padding: 3px 8px;
              border-radius: 9999px;
              font-size: 10px;
              font-weight: 500;
              background: ${project.status === 'completed' ? '#dcfce7' : project.status === 'ongoing' ? '#dbeafe' : '#f3f4f6'};
              color: ${project.status === 'completed' ? '#166534' : project.status === 'ongoing' ? '#1e40af' : '#374151'};
            ">
              ${project.status?.charAt(0).toUpperCase()}${project.status?.slice(1)}
            </span>
          </div>
        `);
        
        marker.on('click', () => setSelectedProject(project));
        markersRef.current.push(marker);
      }
    });

    // Add heatmap layer
    const heatData: [number, number, number][] = filteredProjects
      .filter((p) => p.latitude && p.longitude)
      .map((p) => [p.latitude!, p.longitude!, 0.5]);

    if (heatData.length > 0 && (L as any).heatLayer) {
      (L as any).heatLayer(heatData, {
        radius: 30,
        blur: 40,
        maxZoom: 13,
        max: 1.0,
        gradient: {
          0.0: "#EFE9E3",
          0.3: "#D9CFC7",
          0.5: "#C9B59C",
          0.7: "#B8A888",
          1.0: "#8B7355",
        },
      }).addTo(mapInstance.current);
    }
  }, [projects, filter]);

  const statusCounts = {
    all: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    planned: projects.filter(p => p.status === 'planned').length,
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    if (mapInstance.current && project.latitude && project.longitude) {
      mapInstance.current.flyTo([project.latitude, project.longitude], 15, {
        duration: 1.5
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-secondary/50 to-background relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Interactive Map</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              Our Project Sites
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our construction footprint across Delhi NCR. Each marker represents 
              a project where we've transformed visions into reality.
            </p>
          </motion.div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-border/50 sticky top-16 bg-background/95 backdrop-blur-md" style={{ zIndex: 100 }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: "all", label: "All Projects", icon: Building2 },
              { key: "completed", label: "Completed", icon: CheckCircle },
              { key: "ongoing", label: "Ongoing", icon: Clock },
              { key: "planned", label: "Planned", icon: Calendar },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key as typeof filter)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${filter === item.key 
                    ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  }
                `}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${filter === item.key ? 'bg-white/20' : 'bg-background'}
                `}>
                  {statusCounts[item.key as keyof typeof statusCounts]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50"
                style={{ isolation: 'isolate' }}
              >
                <div 
                  ref={mapContainer} 
                  className="w-full h-[500px] lg:h-[600px]"
                  style={{ position: 'relative', zIndex: 1 }}
                />
                
                {/* Map Legend - Fixed positioning */}
                <div 
                  className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-border/50"
                  style={{ zIndex: 1000 }}
                >
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Legend</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
                      <span className="text-sm">Ongoing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#8b7355] shadow-sm"></div>
                      <span className="text-sm">Planned</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Project List */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/30 rounded-2xl p-4 h-[500px] lg:h-[600px] overflow-y-auto">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 sticky top-0 bg-secondary/30 py-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Project Locations
                </h3>
                <div className="space-y-3">
                  {(filter === "all" ? projects : projects.filter(p => p.status === filter)).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleProjectClick(project)}
                      className={`
                        p-4 rounded-xl cursor-pointer transition-all duration-300 border
                        ${selectedProject?.id === project.id 
                          ? 'bg-accent/10 border-accent/30' 
                          : 'bg-background/50 border-transparent hover:bg-background hover:border-border'
                        }
                      `}
                    >
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">{project.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{project.address}</p>
                      <span className={`
                        inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          project.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'}
                      `}>
                        {project.status?.charAt(0).toUpperCase()}{project.status?.slice(1)}
                      </span>
                    </motion.div>
                  ))}
                  
                  {projects.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p className="text-sm">No projects found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: statusCounts.all, label: "Total Projects", colorClass: "text-accent" },
              { value: statusCounts.completed, label: "Completed", colorClass: "text-green-500" },
              { value: statusCounts.ongoing, label: "In Progress", colorClass: "text-blue-500" },
              { value: statusCounts.planned, label: "Upcoming", colorClass: "text-primary" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-background rounded-2xl shadow-sm border border-border/50"
              >
                <div className={`text-4xl md:text-5xl font-bold ${stat.colorClass} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom fade to footer */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <Footer />
    </div>
  );
};

export default Sites;
