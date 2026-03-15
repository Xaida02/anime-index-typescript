import { motion } from "framer-motion";
import AnimeIndexLogo from "../assets/AnimeIndexLogo.png";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/[0.06] px-8 md:px-12 py-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img
          src={AnimeIndexLogo}
          alt="Anime Index"
          className="w-[80px] opacity-20"
        />

        <p className="text-xs text-white/15 tracking-wide">
          Built by{" "}
          <a
            href="mailto:tejada.v.tobias@gmail.com"
            className="text-white/25 hover:text-emerald-200/60 transition-colors duration-300"
          >
            Tobías Tejada
          </a>{" "}
          · Data from{" "}
          <a
            href="https://jikan.moe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-emerald-200/60 transition-colors duration-300"
          >
            Jikan API
          </a>
        </p>

        <p className="text-xs text-white/10 tracking-widest">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
