import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useGlobalContext } from "../shared/context";
import { useRef, useState } from "react";
import SearchFormBg from "../assets/SearchFormBg.jpg";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { setName } = useGlobalContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    if (inputRef.current !== null) {
      setName(inputRef.current.value);
    }
    const animeListSection = document.getElementById("anime-list");
    if (animeListSection) {
      animeListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen md:h-[75vh] w-full flex items-center justify-center flex-col gap-6 relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="w-full h-full absolute z-[-1] animate-appear">
        <img
          className="w-full h-full object-cover absolute z-[-2] filter blur-[6px] contrast-125 scale-105"
          src={SearchFormBg}
          alt="Blurred background cover"
        />
        {/* overlay más dramático */}
        <div className="w-full h-full z-[-1] absolute bg-gradient-to-b from-[#121212]/80 via-[#121212]/60 to-[#121212]" />
      </div>

      {/* CONTENT */}
      <form
        onSubmit={handleNameChange}
        className="w-[90%] md:w-[60%] flex flex-col items-center gap-5"
      >
        {/* EYEBROW */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs tracking-[0.25em] uppercase text-emerald-200/60 font-light"
        >
          Powered by Jikan API
        </motion.p>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-5xl font-black text-center tracking-tight"
        >
          Find any{" "}
          <span className="text-emerald-200 relative inline-block">
            anime
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-200/0 via-emerald-200 to-emerald-200/0 rounded-full" />
          </span>
          <br />
          {/* <span className="font-light text-white/50 text-2xl md:text-3xl">
            in seconds.
          </span> */}
        </motion.h1>

        {/* SEARCH BOX */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`flex items-center w-full max-w-[560px] px-4 py-3 bg-[#1b1b1b]/90 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
            isInputFocused
              ? "border-emerald-200/70 shadow-[0_0_20px_rgba(167,243,208,0.08)]"
              : "border-white/10"
          }`}
        >
          <input
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            ref={inputRef}
            placeholder="e.g. Cowboy Bebop, Naruto..."
            className="outline-none w-full bg-transparent text-base text-white placeholder:text-white/30"
          />
          <motion.button
            whileTap={{ scale: 0.9, rotate: -15 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className={`relative ml-2 flex-none w-9 h-9 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 ${
              isInputFocused
                ? "bg-emerald-200 text-[#121212] shadow-[0_0_16px_rgba(167,243,208,0.35)]"
                : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/50"
            }`}
          >
            {/* glow pulse cuando está focused */}
            {isInputFocused && (
              <motion.span
                className="absolute inset-0 bg-emerald-200 rounded-xl"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: 0, scale: 1.6 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
            <MagnifyingGlassIcon className="size-4 relative z-10" />
          </motion.button>
        </motion.div>

        {/* HINT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-white/25 tracking-wide"
        >
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/40 text-xs">
            Enter
          </kbd>{" "}
          to search
        </motion.p>
      </form>
    </section>
  );
};

export default SearchBar;
