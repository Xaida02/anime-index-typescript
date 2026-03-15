import { Link } from "react-router-dom";
import { useGlobalContext } from "../shared/context";
import { HeartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth, db } from "../shared/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type Props = {
  name: string;
  image: string;
  genres: Array<{ name: string }>;
  japanese: string;
  index: number;
  id: number;
};

const variantsForStaggeredAnimations = {
  initial: { opacity: 0, y: 50 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.03 * index },
  }),
};

const SingleAnime = ({ name, image, genres, japanese, id, index }: Props) => {
  const [isAnimeAdded, setIsAnimeAdded] = useState(false);
  const { formatToLinkType, adaptString, animeList, userData, isUserLogged } =
    useGlobalContext();

  const genresString = genres.map((item) => item.name).join(", ");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isUserLogged) return alert("Please log in to save an anime.");
    const savedAnime = animeList.find((anime) => anime.mal_id === id);
    const user = auth.currentUser;
    if (user?.email) {
      updateDoc(doc(db, "users", user.email), {
        savedShows: arrayUnion(savedAnime),
      });
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isUserLogged) return alert("Please make sure you're logged in.");
    const filtered = userData.savedShows.filter(
      (anime: any) => anime.mal_id !== id,
    );
    const user = auth.currentUser;
    if (user?.email) {
      updateDoc(doc(db, "users", user.email), { savedShows: filtered });
    }
  };

  useEffect(() => {
    setIsAnimeAdded(
      !!userData.savedShows.find((anime: any) => anime.mal_id === id),
    );
  }, [userData]);

  return (
    <motion.article
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[#1b1b1b] border border-white/5 hover:border-emerald-200/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
      variants={variantsForStaggeredAnimations}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
    >
      {/* IMAGE */}
      <Link to={`/anime/${id}/${formatToLinkType(name)}`}>
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={`${name} portrait`}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>
      </Link>

      {/* FAV BUTTON */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={isAnimeAdded ? handleRemove : handleAdd}
        className="absolute top-3 right-3 z-10 group/btn"
      >
        <div
          className={`relative p-2 rounded-xl backdrop-blur-md transition-all duration-300
    ${
      isAnimeAdded
        ? "bg-emerald-200/15 border border-emerald-200/30"
        : "bg-black/50 border border-white/10 hover:border-emerald-200/20 hover:bg-emerald-200/5"
    }`}
        >
          {/* ping cuando se agrega */}
          {isAnimeAdded && (
            <motion.span
              className="absolute inset-0 rounded-xl border border-emerald-200/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}

          <motion.div
            animate={
              isAnimeAdded
                ? { scale: [1, 1.3, 1], rotate: [0, -10, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.3 }}
          >
            {isAnimeAdded ? (
              <HeartIcon className="size-3.5 text-emerald-200" />
            ) : (
              <HeartIcon className="size-3.5 text-white/30 group-hover/btn:text-emerald-200/60 transition-colors duration-300" />
            )}
          </motion.div>
        </div>
      </motion.button>
      {/* INFO */}
      <div className="flex flex-col gap-0.5 px-3 py-2.5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#59B38E]/70 font-medium truncate">
          {adaptString(genresString, 30)}
        </p>
        <h2 className="text-sm font-bold text-white/90 leading-snug line-clamp-2">
          {name}
        </h2>
        <p className="text-[11px] text-white/25 truncate mt-0.5">{japanese}</p>
      </div>
    </motion.article>
  );
};

export default SingleAnime;
