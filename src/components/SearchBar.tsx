import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useGlobalContext } from "../shared/context";
import { useRef, useState } from "react";
import SearchFormBg from "../assets/SearchFormBg.jpg";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { setName } = useGlobalContext();

  const handleNameChange = (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();
    if (inputRef.current !== null) {
      setName(inputRef.current.value);
    }
    const animeListSection = document.getElementById("anime-list");
    if (animeListSection) {
      animeListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="h-screen md:h-[75vh] w-full flex items-center justify-center flex-col gap-6 relative">
      <div className="w-full h-full absolute z-[-1] overflow-hidden animate-appear">
        <img
          className="w-full h-full object-cover absolute z-[-2] filter blur-[6px] contrast-125"
          src={SearchFormBg}
          alt="Blurred background cover"
        />
        <div className="w-full h-full z-[-1] absolute bg-gradient-to-b to-[#0c0c0c] from-[#0d0d0d91] " />
      </div>
      <form onSubmit={handleNameChange} className="w-[60%]">
        <h1 className="text-2xl md:text-3xl text-center my-4 tracking-wide duration-300">
          <span
            className={`inline font-bold ${
              isInputFocused ? "text-emerald-200" : ""
            } text-lg`}
          >
            -{" "}
          </span>
          Type your{" "}
          <span
            className={`inline ${isInputFocused ? "text-emerald-200" : ""}`}
          >
            anime
          </span>{" "}
          here
          <span
            className={`inline font-bold ${
              isInputFocused ? "text-emerald-200" : ""
            } text-lg`}
          >
            {" "}
            -
          </span>
        </h1>
        <div
          className={`flex m-auto items-center border-2 justify-center w-auto  max-w-[500px] px-2 py-4 bg-[#1b1b1b] text-lg rounded-xl duration-300 ${
            isInputFocused ? "border-emerald-200/90" : " border-gray-500/10"
          }`}
        >
          <motion.button whileTap={{ scale: 1.1 }} type="submit">
            <MagnifyingGlassIcon
              className={`size-6 mx-2 ${
                isInputFocused ? "text-emerald-200/90" : "text-white/50"
              }`}
            />
          </motion.button>
          <input
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            ref={inputRef}
            className="outline-none w-full bg-transparent text-lg"
          />
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
