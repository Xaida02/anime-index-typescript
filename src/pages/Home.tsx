import AnimeList from "../components/AnimeList";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { useGlobalContext } from "../shared/context";

const Home = () => {
  const { loading } = useGlobalContext();

  return (
    <section className="">
      <SearchBar />
      {loading ? <Loading /> : <AnimeList />}
    </section>
  );
};

export default Home;
