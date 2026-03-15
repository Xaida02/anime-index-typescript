import { motion } from "framer-motion";
import { useGlobalContext } from "../shared/context";
import { Navigate } from "react-router-dom";
import SingleAnime from "../components/SingleAnime";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const MyListPage = () => {
  const { isUserLogged, loading, userData } = useGlobalContext();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (userData.savedShows.length) {
      const random = Math.floor(Math.random() * userData.savedShows.length);
      setBackgroundImage(
        userData.savedShows[random].images.jpg.large_image_url,
      );
    }
  }, [userData]);

  const slide = (direction: "left" | "right") => {
    const el = document.getElementById("slider");
    if (el) el.scrollLeft += direction === "left" ? -500 : 500;
  };

  return isUserLogged && !loading ? (
    <>
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        {backgroundImage && (
          <img
            key={backgroundImage}
            src={backgroundImage}
            className="w-full h-full object-cover scale-110 blur-2xl opacity-25 transition-all duration-700"
            alt=""
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/70 via-[#121212]/85 to-[#121212]" />
      </div>

      <section className="min-h-screen w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        {/* HEADER */}
        <div className="flex flex-col gap-1 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-emerald-200 rounded-full" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/30 font-light">
              My collection
            </span>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              My List
            </h2>
            <span className="text-sm text-emerald-200/60 font-light">
              {userData.savedShows.length}{" "}
              {userData.savedShows.length === 1 ? "title" : "titles"}
            </span>
          </div>
        </div>

        {/* SLIDER */}
        {userData.savedShows.length > 0 ? (
          <div className="relative px-6">
            {/* LEFT */}
            <motion.button
              onClick={() => slide("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 group/chevron p-2 rounded-full bg-[#1a1a1a] border border-white/[0.08] hover:border-emerald-200/30 hover:bg-emerald-200/5 transition-all duration-300"
            >
              <ChevronLeftIcon className="size-4 text-white/25 group-hover/chevron:text-emerald-200/70 transition-colors duration-300" />
            </motion.button>

            {/* CARDS */}
            <div
              id="slider"
              className="grid auto-cols-[200px] grid-flow-col gap-5 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {userData.savedShows.map((anime, index) => (
                <SingleAnime
                  index={index}
                  id={anime.mal_id}
                  key={anime.mal_id}
                  name={anime.title}
                  image={anime.images.webp.large_image_url}
                  genres={anime.genres}
                  japanese={anime.title_japanese}
                />
              ))}
            </div>

            {/* RIGHT */}
            <motion.button
              onClick={() => slide("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 group/chevron p-2 rounded-full bg-[#1a1a1a] border border-white/[0.08] hover:border-emerald-200/30 hover:bg-emerald-200/5 transition-all duration-300"
            >
              <ChevronRightIcon className="size-4 text-white/25 group-hover/chevron:text-emerald-200/70 transition-colors duration-300" />
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-[1px] bg-white/10 rounded-full" />
            <p className="text-white/25 text-base font-light">
              Your list is empty
            </p>
            <p className="text-white/10 text-xs tracking-wide">
              Search for anime and save your favorites
            </p>
          </div>
        )}
      </section>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default MyListPage;
