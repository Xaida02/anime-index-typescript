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

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-light">
      {label}
    </span>
    <span className="text-sm text-white/80 font-medium">{value}</span>
  </div>
);

const AnimePage = () => {
  const [pageAnime, setPageAnime] = useState<Anime | null>(null);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const { animeTitle, id } = useParams<{ animeTitle: string; id: string }>();
  const { loading, setLoading, url, adaptString } = useGlobalContext();

  const handleNewPageAnime = (item: any) => {
    if (!item) return null;
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
      genres: item.genres?.map((g: any) => g.name).join(", ") || "No genres",
      studios: item.studios?.map((s: any) => s.name).join(", ") || "No studios",
      themes: item.themes?.map((t: any) => t.name).join(", ") || "No themes",
    };
  };

  const fetchAnimePageData = useCallback(
    async (link: string, retries = 6, delay = 1000) => {
      try {
        setLoading(true);
        const response = await fetch(link + animeTitle);
        if (!response.ok) {
          if (retries > 0) {
            await new Promise((r) => setTimeout(r, delay));
            return fetchAnimePageData(link, retries - 1, delay * 2);
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const apiData = await response.json();
        const target = apiData.data?.find(
          (anime: any) => anime.mal_id === Number(id),
        );
        setPageAnime(handleNewPageAnime(target));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [animeTitle, setLoading, url],
  );

  useEffect(() => {
    fetchAnimePageData(url);
  }, [url, fetchAnimePageData]);

  if (loading || !pageAnime) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src={pageAnime.image}
          className="w-full h-full object-cover scale-110 blur-2xl opacity-20"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 via-[#121212]/90 to-[#121212]" />
      </div>

      <section className="min-h-screen w-full max-w-[1100px] mx-auto px-6 py-32 md:py-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          {/* LEFT — POSTER */}
          <div className="flex-none flex flex-col items-center lg:items-start gap-5 w-full lg:w-auto">
            <div className="relative w-full max-w-[260px] mx-auto lg:mx-0">
              <img
                src={pageAnime.image}
                alt={pageAnime.title}
                className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] object-cover"
              />
              {/* STATUS BADGE */}
              <span
                className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium backdrop-blur-sm
                ${
                  pageAnime.status === "Currently Airing"
                    ? "bg-emerald-200/20 text-emerald-200 border border-emerald-200/30"
                    : "bg-white/10 text-white/50 border border-white/10"
                }`}
              >
                {pageAnime.status === "Currently Airing"
                  ? "Airing"
                  : "Finished"}
              </span>
            </div>

            {/* TITLE BLOCK */}
            <div className="text-center lg:text-left max-w-[260px]">
              <h1 className="text-xl font-black text-white leading-tight">
                {pageAnime.title}
              </h1>
              <p className="text-sm text-white/35 mt-1">
                {pageAnime.japaneseTitle}
              </p>
              <p className="text-xs text-[#59B38E] mt-2">{pageAnime.genres}</p>
            </div>

            {/* SCORE HIGHLIGHT */}
            <div className="flex items-center gap-4 w-full max-w-[260px] bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/25">
                  Score
                </span>
                <span className="text-3xl font-black text-emerald-200">
                  {pageAnime.score}
                </span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/25">
                  Rank
                </span>
                <span className="text-sm font-semibold text-white/60">
                  #{pageAnime.rank}
                </span>
                <span className="text-[10px] text-white/25">
                  {pageAnime.scoredBy.toLocaleString()} votes
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — INFO */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            {/* STATS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
              <StatItem label="Studio" value={pageAnime.studios} />
              <StatItem label="Year" value={pageAnime.year} />
              <StatItem label="Type" value={pageAnime.type} />
              <StatItem label="Source" value={pageAnime.source} />
              <StatItem label="Duration" value={pageAnime.duration} />
              <StatItem label="Rating" value={pageAnime.rating} />
              <StatItem label="Popularity" value={`#${pageAnime.popularity}`} />
              <StatItem label="Themes" value={pageAnime.themes || "—"} />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-4 h-[2px] bg-emerald-200 rounded-full" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Synopsis
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {showMoreDesc
                  ? pageAnime.description
                  : adaptString(pageAnime.description, 400)}
                {pageAnime.description.length > 400 && (
                  <button
                    onClick={() => setShowMoreDesc(!showMoreDesc)}
                    className="inline-flex items-center gap-1 ml-2 text-emerald-200/70 hover:text-emerald-200 transition-colors duration-200 text-xs"
                  >
                    {showMoreDesc ? (
                      <>
                        <ArrowUpIcon className="size-3" /> Less
                      </>
                    ) : (
                      <>
                        <ArrowDownIcon className="size-3" /> More
                      </>
                    )}
                  </button>
                )}
              </p>
            </div>

            {/* TRAILER */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.05] aspect-video w-full">
              {pageAnime.trailer ? (
                <iframe
                  src={pageAnime.trailer}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/[0.02] relative">
                  <img
                    src={pageAnime.image}
                    className="absolute inset-0 w-full h-full object-cover opacity-5 blur-lg"
                    alt=""
                  />
                  <p className="text-white/20 text-sm relative z-10">
                    No trailer available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnimePage;
