import { Link } from "react-router-dom";
import { useGlobalContext } from "../shared/context";
import { DocumentCheckIcon, HeartIcon } from "@heroicons/react/24/solid";
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

// STAGGERED APPEAR-IN ANIMATIONS
const variantsForStaggeredAnimations = {
  initial: {
    opacity: 0,
    y: 50,
    blur: 2,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    blur: 0,
    transition: { delay: 0.03 * index },
  }),
};

const SingleAnime = ({ name, image, genres, japanese, id, index }: Props) => {
  const [isAnimeAdded, setIsAnimeAdded] = useState(false);
  const { formatToLinkType, adaptString, animeList, userData, isUserLogged } =
    useGlobalContext();

  const genresElementsToString = genres.map((item) => item.name).join(", ");
  const handleAddToMyAnimeList = (
    animeId: number,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();
    if (isUserLogged) {
      const savedAnime: any = animeList.find((anime) => {
        return anime.mal_id === animeId;
      });
      const user = auth.currentUser;
      if (user && user.email) {
        updateDoc(doc(db, "users", user.email), {
          savedShows: arrayUnion(savedAnime),
        });
      }
    } else {
      alert("Please log in to save an anime.");
    }
  };
  const handleRemoveFromMyAnimeList = (
    animeId: number,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();
    if (isUserLogged) {
      const filteredAnimeArray: Array<Object> = userData.savedShows.filter(
        (anime: any) => anime.mal_id !== animeId
      );
      const user = auth.currentUser;
      if (user && user.email) {
        updateDoc(doc(db, "users", user.email), {
          savedShows: filteredAnimeArray,
        });
      }
    } else {
      alert("Please make sure you're logged in.");
    }
  };

  useEffect(() => {
    if (userData.savedShows.find((anime: any) => anime.mal_id === id)) {
      setIsAnimeAdded(true);
    } else {
      setIsAnimeAdded(false);
    }
  }, [userData]);

  const MotionLink = motion.create(Link);

  return (
    <motion.article
      className="relative border-gray-900/20 grid grid-rows-subgrid rounded-xl row-span-4 drop-shadow overflow-hidden gap-2 p-3 bg-[#1b1b1b] border-2 hover:border-[#59B38E]"
      variants={variantsForStaggeredAnimations}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
    >
      <MotionLink
        className="relative group flex items-center justify-center hover:contrast-125 duration-500 border-gray-900/10 rounded-xl overflow-hidden"
        to={`/anime/${id}/${formatToLinkType(name)}`}
      >
        {/* <div
          key={`${isAnimeAdded}`}
          className="text-emerald-200 hidden md:block absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 duration-500 tracking-wide text-sm gap-2 rounded-xl bottom-0 right-2"
        >
          {isAnimeAdded ? (
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={(e) => handleRemoveFromMyAnimeList(id, e)}
              className="hover:text-[#59B38E] duration-300 relative animate-appear"
            >
              <div className="before:opacity-0 before:text-[#59B38E] before:blur-[2px] before:hover:blur-0 before:w-[100px] before:-right-2 before:absolute hover:before:right-8 hover:before:opacity-100 before:duration-300 before:delay-200 before:content-['Anime_added']">
                <DocumentCheckIcon className="size-5" />
              </div>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={(e) => handleAddToMyAnimeList(id, e)}
              className="hover:text-[#59B38E] duration-300 relative animate-appear"
            >
              <div className="before:opacity-0 before:text-[#59B38E] before:blur-[2px] before:hover:blur-0 before:w-[100px] before:-right-2 before:absolute hover:before:right-8 hover:before:opacity-100 before:duration-300 before:delay-200 before:content-['Add_to_my_list']">
                <HeartIcon className="size-5" />
              </div>
            </motion.button>
          )}
        </div> */}
        <img
          className="w-[220px] h-[275px] -z-10 object-cover opacity-95 rounded-xl"
          src={image}
          alt={`${name} portrait image.`}
        />
      </MotionLink>
      <div className="flex flex-col justify-end">
        <p className="text-[#59B38E] text-[13px]">
          {adaptString(genresElementsToString, 34)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2>{adaptString(name, 20)}</h2>
        <p
          key={`${isAnimeAdded}`}
          className=" text-emerald-200/60 text-sm md:text-base"
        >
          {isAnimeAdded ? (
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={(e) => handleRemoveFromMyAnimeList(id, e)}
              className="hover:text-[#59B38E] duration-300 relative animate-appear"
            >
              <DocumentCheckIcon className="size-5" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={(e) => handleAddToMyAnimeList(id, e)}
              className="hover:text-[#59B38E] duration-300 relative animate-appear"
            >
              <HeartIcon className="size-5" />
            </motion.button>
          )}
        </p>
      </div>
      <div className="text-emerald-200/90 font-serif">
        <p className="text-gray-300/80 text-sm capitalize p2">{japanese}</p>
      </div>
    </motion.article>
  );
};

export default SingleAnime;
