import {
  MagnifyingGlassCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useGlobalContext } from "../shared/context";
import SingleAnime from "./SingleAnime";
import { motion } from "framer-motion";

const AnimeList = () => {
  const { animeList, name, setName } = useGlobalContext();

  return (
    <section className="md:h-auto w-full h-screen p-10 bg-gradient-to-b">
      <div className="flex w-full justify-between my-6 md:my-4">
        <h4 className="text-xl">
          {name ? (
            <motion.p
              animate={{
                y: 0,
                opacity: 1,
              }}
              initial={{
                y: -10,
                opacity: 0,
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                damping: 5,
              }}
            >
              Search results for "
              <div className="text-emerald-200 inline-block">{name}</div>"
            </motion.p>
          ) : (
            <p className="flex items-center justify-center gap-2">
              Search an anime
              <MagnifyingGlassCircleIcon className="size-6 inline text-emerald-200" />
            </p>
          )}
        </h4>
        <motion.button
          whileTap={{
            scale: 1.1,
          }}
          disabled={!name}
          onClick={() => setName("")}
          className={`flex justify-center items-center ${
            name ? "" : "opacity-50"
          }`}
        >
          <p className="hidden md:block md:mr-2">Clear Results</p>
          <TrashIcon className="size-6 md:size-5" />
        </motion.button>
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10 min-h-[500px]">
        {animeList.length > 0 ? (
          animeList.map((anime, index) => {
            return (
              <SingleAnime
                index={index}
                id={anime.mal_id}
                key={anime.mal_id}
                name={anime.title}
                image={anime.images.webp.large_image_url}
                genres={anime.genres}
                japanese={anime.title_japanese}
              />
            );
          })
        ) : (
          <motion.h2
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            initial={{
              y: 100,
              opacity: 0,
              scale: 0.5,
            }}
            className="text-xl text-white/80 col-span-5 p-5 mx-auto"
          >
            Sorry! It seems that there aren't any results. 😿
          </motion.h2>
        )}
      </div>
    </section>
  );
};

export default AnimeList;
