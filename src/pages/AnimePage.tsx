import { useParams } from "react-router-dom";
import { useGlobalContext } from "../shared/context";
import { useCallback, useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import Loading from "../components/Loading";

type Anime = {
  popularity: number;
  themes: string;
  title: string;
  trailer: string;
  status: "Currently Airing" | "Finished Airing";
  description: string;
  japaneseTitle: string;
  image: string;
  genres: string;
  studios: string;
  rating: string;
  rank: string;
  year: number;
  score: number;
  scoredBy: number;
  type: string;
  source: string;
  duration: string;
};

const AnimePage = () => {
  const [pageAnime, setPageAnime] = useState<Anime | null>(null);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const { animeTitle, id } = useParams<{ animeTitle: string; id: string }>();
  const { loading, setLoading, url, adaptString } = useGlobalContext();

  const handleNewPageAnime = (item: any) => {
    if (item !== null) {
      return {
        image: item.images.webp.large_image_url ?? "",
        trailer: item.trailer.embed_url ?? "",
        description: item.synopsis ?? "No description available",
        title: item.title ?? "Unknown title",
        japaneseTitle: item.title_japanese ?? "Unknown Japanese title",
        status: item.status ?? "Unknown status",
        rating: item.rating ?? "No rating",
        rank: item.rank ?? "Unranked",
        score: item.score ?? "N/A",
        scoredBy: item.scored_by ?? 0,
        year: item.aired?.prop?.from?.year ?? "Unknown",
        source: item.source ?? "Unknown source",
        duration: item.duration ?? "Unknown duration",
        type: item.type ?? "Unknown type",
        popularity: item.popularity ?? 0,
        // ARRAYS HERE
        genres: item.genres?.map((g: any) => g.name).join(", ") || "No genres",
        studios:
          item.studios?.map((s: any) => s.name).join(", ") || "No studios",
        themes: item.themes?.map((t: any) => t.name).join(", ") || "No themes",
      };
    } else {
      return null;
    }
  };

  const fetchAnimePageData = useCallback(
    async (link: string, retries: number = 6, delay: number = 1000) => {
      try {
        setLoading(true);
        const response = await fetch(link + animeTitle);
        if (!response.ok) {
          console.error("Error occurred with status: " + response.status);
          if (retries > 0) {
            console.log(
              `Retrying in ${delay / 1000} seconds... (${retries} retries left)`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchAnimePageData(link, retries - 1, delay * 2);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        const apiData = await response.json();
        const newAnimeList = apiData.data;
        //  setCurrentAnime(animeApi.data.find((anime) => anime.title === name));
        if (newAnimeList) {
          const target = newAnimeList.find(
            (anime: any) => anime.mal_id === Number(id)
          );
          setPageAnime(handleNewPageAnime(target));
        } else {
          setPageAnime(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [animeTitle, setLoading, setPageAnime, url]
  );

  useEffect(() => {
    fetchAnimePageData(url);
  }, [url, fetchAnimePageData, animeTitle]);

  return loading || pageAnime === null ? (
    <div className="h-screen flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <section className="flex min-h-[100vh] h-auto w-full items-center justify-center my-40 md:my-10">
      <div className="grid lg:grid-flow-col lg:grid-cols-[repeat(4,300px)] lg:grid-rows-[repeat(3,180px)] gap-4 p-6 w-auto place-content-center my-auto">
        {/* ANIME PORTRAIT */}
        <div className="border-2 border-gray-800/10 bg-[#171717] md:row-span-3 rounded-xl overflow-hidden flex md:flex-col">
          <div className="flex-none md:h-2/3">
            <img
              src={pageAnime.image}
              className="w-[150px] md:w-full md:h-full object-cover"
              alt=""
            />
          </div>
          <div className="h-full flex justify-between md:justify-center flex-col min-h-fit gap-4 p-6 md:p-4">
            <p className="text-lg">{pageAnime.title}</p>
            <p className="text-gray-300/80">{pageAnime.japaneseTitle}</p>
            <p className="text-[#59B38E]">{pageAnime.genres}</p>
            <div className="flex justify-between">
              <p className="text-sm text-gray-300/40">{pageAnime.type}</p>
              <p className="text-sm text-gray-300/40">{pageAnime.status}</p>
            </div>
          </div>
        </div>
        {/* STUDIO AND STUFF */}
        <div className="border-2 border-gray-800/10 bg-[#171717] rounded-lg p-4 grid text-sm">
          <div className="text-[#59B38E]">
            Studios:{" "}
            <p className="text-white/80 inline-block">{pageAnime.studios}</p>
          </div>
          <div className="text-[#59B38E]">
            Year:{" "}
            <p className="text-white/80 inline-block">
              {pageAnime.year ? pageAnime.year : "Unknownz"}
            </p>
          </div>
          <div className="text-[#59B38E]">
            Source:{" "}
            <p className="text-white/80 inline-block">{pageAnime.source}</p>
          </div>
          <div className="text-[#59B38E]">
            Rating:{" "}
            <p className="text-white/80 inline-block"> {pageAnime.rating}</p>
          </div>
          <div className="text-[#59B38E]">
            Duration:{" "}
            <p className="text-white/80 inline-block"> {pageAnime.duration}</p>
          </div>
        </div>
        {/* DON'T KNOW WHAT I'LL BE PUTTING HERE */}
        <div className="border-2 border-gray-800/10 bg-[#171717] rounded-lg p-4 grid text-sm">
          <div className="text-[#59B38E]">
            Score:{" "}
            <p className="text-white/80 inline-block">{pageAnime.score}</p>
          </div>
          <div className="text-[#59B38E]">
            Scored by:{" "}
            <p className="text-white/80 inline-block">{pageAnime.scoredBy}</p>
          </div>
          <div className="text-[#59B38E]">
            Rank:{" "}
            <p className="text-white/80 inline-block">#{pageAnime.rank}</p>
          </div>
          <div className="text-[#59B38E]">
            Popularity:{" "}
            <p className="text-white/80 inline-block">{pageAnime.popularity}</p>
          </div>
          <div className="text-[#59B38E]">
            Themes:{" "}
            <p className="text-white/80 inline-block">{pageAnime.themes}</p>
          </div>
        </div>
        {/* ANIME DESCRIPTION */}
        <div
          className={`bg-[#171717] md:col-span-1 lg:col-span-3 min-h-full rounded-lg p-4 duration-300 text-sm ${
            showMoreDesc && "h-fit"
          }`}
        >
          <span className="block text-[#59B38E]"> Description:</span>
          <div key={`${showMoreDesc}`} className="animate-appear text-white/80">
            {showMoreDesc ? (
              <>{pageAnime.description} </>
            ) : (
              <>{adaptString(pageAnime.description, 755)} </>
            )}
            {/* CONDITION TO HANDLE THE CASE WHERE A SHOW MORE/LESS BTN ISN'T NEED */}
            {pageAnime.description.length < 755 ? (
              ""
            ) : (
              <button
                className="inline-block text-emerald-200 hover:underline duration-300"
                onClick={() => setShowMoreDesc(!showMoreDesc)}
              >
                <div className="flex items-center justify-center">
                  {!showMoreDesc ? (
                    <>
                      Show more
                      <ArrowDownIcon className="size-3 mx-1 inline-block" />
                    </>
                  ) : (
                    <>
                      Show less
                      <ArrowUpIcon className="size-3 mx-1 inline-block" />
                    </>
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
        {/* ANIME TRAILER */}
        <div className="border-2 border-gray-800/10 bg-[#171717] md:col-span-2 md:row-span-2 rounded-lg overflow-hidden min-h-[300px] md:min-h-[450px] lg:min-h-full">
          {pageAnime.trailer ? (
            <iframe src={pageAnime.trailer} className="w-full h-full" />
          ) : (
            <div className="w-full h-full relative flex">
              <img
                className="object-cover w-full h-full opacity-10 filter blur-2xl contrast-150 absolute"
                draggable="false"
                src={pageAnime.image}
                alt={`${pageAnime.title} portrait.`}
              />
              <p className="m-auto text-lg md:text-xl">
                Sorry! No trailer available for this anime
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnimePage;
