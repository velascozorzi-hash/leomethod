import Container from "@/components/container";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-12">
      <Container>
        <div className="flex justify-center md:justify-start pb-10 border-b border-white/10">
          <Link to="/" className="inline-block">
            <img
              src="/images/common/logo.svg"
              alt="Logo"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        <div className="pt-8 flex flex-col gap-6">
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            Les résultats présentés (captures, témoignages) sont des exemples individuels et ne
            constituent pas une garantie de revenus. Ce site n'est affilié à aucune plateforme tierce.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} — Tous droits réservés.
            </p>
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
              <Link to="/legal/cgv" className="text-white/70 hover:text-white transition-colors">
                CGV
              </Link>
              <Link to="/legal/confidentialite" className="text-white/70 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/legal/cookies" className="text-white/70 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link to="/legal/remboursement" className="text-white/70 hover:text-white transition-colors">
                Remboursement
              </Link>
              <a href="mailto:velascozorzi@gmail.com" className="text-white/70 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
