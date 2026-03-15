import { TrashIcon } from "@heroicons/react/24/solid";
import { useGlobalContext } from "../shared/context";
import SingleAnime from "./SingleAnime";
import { motion, AnimatePresence } from "framer-motion";

const AnimeList = () => {
  const { animeList, name, setName } = useGlobalContext();

  return (
    <section
      id="anime-list"
      className="w-full min-h-screen px-6 md:px-12 pt-16 pb-20"
    >
      {/* HEADER */}
      <div className="flex w-full justify-between items-end mb-10 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {name ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-emerald-200 rounded-full" />
                <span className="text-xs tracking-[0.2em] uppercase text-white/30 font-light">
                  Search results
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {name}
                </h2>
                <motion.span
                  key={animeList.length}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-emerald-200/60 font-light"
                >
                  {animeList.length} titles
                </motion.span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-white/10 rounded-full" />
                <span className="text-xs tracking-[0.2em] uppercase text-white/15 font-light">
                  Discover
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white/10 mt-1">
                Your next obsession
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {name && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              whileTap={{ scale: 1.05 }}
              onClick={() => setName("")}
              className="flex items-center gap-2 text-xs text-white/20 hover:text-white/60 border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-all duration-300"
            >
              <span className="hidden md:block tracking-wide">Clear</span>
              <TrashIcon className="size-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* GRID */}
      <AnimatePresence mode="wait">
        {animeList.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-[repeat(auto-fill,minmax(170px,200px))] justify-center gap-x-5 gap-y-8 max-w-[1400px] mx-auto"
          >
            {animeList.map((anime, index) => (
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
          </motion.div>
        ) : name ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="w-10 h-[1px] bg-white/10 rounded-full" />
            <p className="text-white/25 text-base font-light">
              No results for "{name}"
            </p>
            <p className="text-white/10 text-xs tracking-wide">
              Try another title
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="ghost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-[repeat(auto-fill,minmax(170px,200px))] justify-center gap-x-5 gap-y-8 max-w-[1400px] mx-auto"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 - i * 0.07 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl overflow-hidden bg-white/[0.025] border border-white/[0.05]"
              >
                <div className="w-full aspect-[2/3] bg-gradient-to-b from-white/[0.03] to-transparent" />
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-1.5 w-14 bg-white/[0.05] rounded-full" />
                  <div className="h-2.5 w-20 bg-white/[0.06] rounded-full" />
                  <div className="h-1.5 w-16 bg-white/[0.04] rounded-full" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AnimeList;
