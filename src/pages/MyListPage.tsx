import { motion } from "framer-motion";
import { useGlobalContext } from "../shared/context";
import { Navigate } from "react-router-dom";
import SingleAnime from "../components/SingleAnime";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const MyListPage = () => {
  const { isUserLogged, loading, userData } = useGlobalContext();
  const [backGroundImage, setBackGroundImage] = useState(null);

  useEffect(() => {
    if (userData.savedShows.length) {
      const randomNumber = Math.floor(
        Math.random() * userData.savedShows.length
      );
      setBackGroundImage(
        userData.savedShows[randomNumber].images.jpg.large_image_url
      );
    }
    console.log(backGroundImage);
  }, [userData]);

  const slide = (direction: "left" | "right") => {
    let sliderElement = document.getElementById("slider");
    if (sliderElement && direction === "left") {
      console.log(sliderElement.scrollLeft);
      sliderElement.scrollLeft = sliderElement.scrollLeft - 500;
    }
    if (sliderElement && direction === "right") {
      console.log(sliderElement.scrollLeft);
      sliderElement.scrollLeft = sliderElement.scrollLeft + 500;
    }
  };

  return isUserLogged && !loading ? (
    <>
      {backGroundImage && (
        <div
          key={`${userData.savedShows.length}`}
          className="absolute w-full h-full blur-sm animate-appear"
        >
          <img
            className="absolute w-full h-full object-cover z-[-1] contrast-125"
            src={backGroundImage}
            alt="Background blurred image"
          />
          <div className="w-full h-full bg-black/90 absolute z-[-1]" />
        </div>
      )}
      <section className="pt-24  md:pt-10 h-full relative">
        <div className="w-[95%] mt-20 mx-auto">
          <h2 className="text-2xl md:text-3xl">
            Your list of saved{" "}
            <span className="text-emerald-200 inline">Animes</span>
          </h2>
          <p className="text-white/80 mt-2">
            "<span className="text-white">{userData.savedShows.length}</span>"
            Elements in your list.
          </p>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden">
          {/* SCROLL LEFT BUTTON */}
          <motion.button
            onClick={() => slide("left")}
            whileTap={{ scale: 1.15 }}
            className="absolute bottom-1/2 left-1 z-[2] text-emerald-200 duration-300 hover:text-[#59B38E] rounded-full p-1 bg-black/70 md:bg-black/30 animate-appear"
          >
            <ChevronLeftIcon className="size-5" />
          </motion.button>
          <div
            id="slider"
            className="h-[450px] my-4 mx-auto w-[95%] grid justify-start auto-cols-[250px] grid-flow-col overflow-hidden gap-8 p-8 relative bg-[#121212]/90 border-2 rounded-xl border-gray-500/10"
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
          {/* SCROLL RIGHT BUTTON */}
          <motion.button
            onClick={() => slide("right")}
            whileTap={{ scale: 1.15 }}
            className="absolute bottom-1/2 right-1 z-[2] text-emerald-200 duration-300 hover:text-[#59B38E] rounded-full p-1 bg-black/70 md:bg-black/30 animate-appear"
          >
            <ChevronRightIcon className="size-5" />
          </motion.button>
        </div>
      </section>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default MyListPage;
{
  /* HEADER AND STUFF */
}
