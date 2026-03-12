import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const languages = ["NL", "EN", "ES", "AR", "UA"];

const StickyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("NL");
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/what-we-do", label: "What do we do?" },
    { to: "/more-info", label: "More information" },
    { to: "/signup", label: "Sign Up" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-[420px] mx-auto flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="VluchtelingenWerk Nederland" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded-md border"
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-card border rounded-lg shadow-lg py-1 min-w-[80px]">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-accent ${l === lang ? 'text-primary font-semibold' : 'text-foreground'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-foreground">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="max-w-[420px] mx-auto border-t bg-card px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default StickyHeader;
