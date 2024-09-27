import AnimeList from "../components/AnimeList";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { useGlobalContext } from "../shared/context";

type Props = {};

const Home = (props: Props) => {
  const { loading } = useGlobalContext();

  return (
    <section className="">
      <SearchBar />
      {loading ? <Loading /> : <AnimeList />}
    </section>
  );
};

export default Home;
