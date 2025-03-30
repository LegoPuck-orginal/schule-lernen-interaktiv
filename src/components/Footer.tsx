
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg">SchuleBauerLernen</span>
            </div>
            <p className="text-muted-foreground">
              Deine Lernplattform für Mathematik, Deutsch und Englisch - von Klasse 5 bis 13. 
              Speziell für Hamburger Schüler konzipiert.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/subject/math" className="text-muted-foreground hover:text-primary transition-colors">
                  Mathematik
                </Link>
              </li>
              <li>
                <Link to="/subject/german" className="text-muted-foreground hover:text-primary transition-colors">
                  Deutsch
                </Link>
              </li>
              <li>
                <Link to="/subject/english" className="text-muted-foreground hover:text-primary transition-colors">
                  Englisch
                </Link>
              </li>
              <li>
                <Link to="/grades" className="text-muted-foreground hover:text-primary transition-colors">
                  Klassenstufen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/nutzungsbedingungen" className="text-muted-foreground hover:text-primary transition-colors">
                  Nutzungsbedingungen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="mailto:info@schulebauer-lernen.de" className="text-muted-foreground hover:text-primary transition-colors">
                  info@schulebauer-lernen.de
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="tel:+4940123456789" className="text-muted-foreground hover:text-primary transition-colors">
                  +49 40 123 456 789
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Schulstraße 1<br />
                  20095 Hamburg
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} SchuleBauerLernen. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
