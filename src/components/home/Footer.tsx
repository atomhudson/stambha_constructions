import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://res.cloudinary.com/dgv8awzpn/image/upload/v1767894340/stambha_footer_afzgw4.png"
                alt="Stambha Logo"
                className="h-14 md:h-16 lg:h-20 w-auto max-w-[200px] md:max-w-[240px] object-contain transition-transform duration-300 hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
                decoding="sync"
              />
            </Link>
            <p className="text-sm text-accent-foreground/70 leading-relaxed">
              Building dreams since 1970s. Three generations of construction excellence across Delhi.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/founder", label: "Our Story" },
                { to: "/interior", label: "Interior" },
                { to: "/materials", label: "Materials" },
                { to: "/unique", label: "Why Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-accent-foreground/70 hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/services/residential", label: "Residential Construction" },
                { to: "/services/commercial", label: "Commercial Projects" },
                { to: "/services/interior-design", label: "Interior Design" },
                { to: "/services/renovation", label: "Renovation & Restoration" },
                { to: "/services/consultancy", label: "Consultancy" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-accent-foreground/70 hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3 text-sm text-accent-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Delhi, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98XXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@Stambha.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-accent-foreground/60">
          <p>&copy; {new Date().getFullYear()} Stambha Constructions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="hover:text-accent-foreground transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
