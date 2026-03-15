import { useNavigate } from "react-router-dom";
import AnimeIndexLogo from "../assets/AnimeIndexLogo.png";
import { motion } from "framer-motion";

const Logo = () => {
  const goHome = useNavigate();

  return (
    <motion.button
      onClick={() => goHome("/")}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative group"
    >
      {/* glow detrás del logo en hover */}
      <span className="absolute inset-0 rounded-lg bg-emerald-200/0 group-hover:bg-emerald-200/5 blur-xl transition-all duration-500" />
      <img
        className="relative object-contain w-[90px] md:w-[120px] opacity-85 group-hover:opacity-100 transition-opacity duration-300"
        src={AnimeIndexLogo}
        alt="Anime Index"
      />
    </motion.button>
  );
};

export default Logo;
