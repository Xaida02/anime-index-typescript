import { useNavigate } from "react-router-dom";
import AnimeIndexLogo from "../assets/AnimeIndexLogo.png";

const Logo = () => {
  const goHome = useNavigate();

  return (
    <button onClick={() => goHome("/")}>
      <img
        className="object-cover mx-auto md:mx-0 max-w-[100px] md:max-w-[150px]"
        src={AnimeIndexLogo}
        alt="anime-index-logo"
      />
    </button>
  );
};

export default Logo;
