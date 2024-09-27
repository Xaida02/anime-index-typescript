import Logo from "./Logo";
import {
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  ListBulletIcon,
  MinusCircleIcon,
  MinusIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import { Pages } from "../shared/typeScriptStuff";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalContext } from "../shared/context";
type Props = {
  isTopOfThePage: boolean;
  currentPage: string;
  setCurrentPage: (value: Pages) => void;
};

// LINES FOR THE NAV LINKS
const currentPageNavButtonStyle =
  "after:bg-emerald-200 after:scale-x-[4] text-gray-100";

const MotionLink = motion.create(Link);

// NAVIGATE TO PAGE REACT ROUTER HOOK

const Navbar = ({ setCurrentPage, currentPage, isTopOfThePage }: Props) => {
  const navigate = useNavigate();

  const handleGoToMyListPage = (e: { preventDefault: any }) => {
    e.preventDefault();
    if (isUserLogged) {
      setCurrentPage(Pages.myList);
      navigate("my-list");
    } else {
      alert("Please log in to enter this page.");
    }
  };
  const { isUserLogged, logOut, userData, loading } = useGlobalContext();
  return (
    <div className=" w-full flex items-center justify-center relative z-30">
      <nav
        // KEY JUST TO TRIGGER A RE-RENDER
        key={`${isTopOfThePage}`}
        className={`after:hidden top-0 text-white flex md:grid grid-cols-3 transition-all duration-300 p-4 md:p-2 ${
          isTopOfThePage
            ? "absolute w-full md:w-[95%] animate-shadeIn"
            : "fixed drop-shadow w-full animate-shadeIn bg-[#121212]"
        }`}
      >
        {/* MOBILE SIDEBAR */}
        <div className="md:hidden flex flex-col mx-auto">
          <div>
            <Logo />
            <div className="flex items-center justify-between gap-2 text-[#59B38E]">
              <Link to={"/"} onClick={() => setCurrentPage(Pages.home)}>
                <HomeIcon
                  className={`size-5 duration-300 ${
                    currentPage === "home" && "text-emerald-200 scale-125"
                  }`}
                />
              </Link>
              <MinusIcon />
              <Link to={"/about"} onClick={() => setCurrentPage(Pages.about)}>
                <EllipsisHorizontalCircleIcon
                  className={`size-5 duration-300 ${
                    currentPage === "about" && "text-emerald-200 scale-125"
                  }`}
                />
              </Link>
              <MinusIcon />
              <Link
                to={"/my-list"}
                onClick={() => setCurrentPage(Pages.myList)}
              >
                <ListBulletIcon
                  className={`size-5 duration-300 ${
                    currentPage === "myList" && "text-emerald-200 scale-125"
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>
        {/* LOGO AND TITLE */}
        <div className="p-2 md:p-0 hidden md:flex items-center justify-center md:place-content-start select-none filter duration-300 hover:contrast-125 mx-auto md:mx-0">
          <Logo />
        </div>
        {/* LINKS LIST */}
        <div className="after:hidden hidden md:flex my-6 md:my-0 items-center justify-evenly md:justify-center gap-6 text-gray-300 text-sm md:text-base md:w-auto md:p-0">
          <Link
            to={"/"}
            onClick={() => setCurrentPage(Pages.home)}
            className={`hover:text-white after:absolute after:w-1/5 relative flex items-center justify-center duration-300 transition-all after:content-[''] after:-bottom-2 after:duration-300 after:transition-transform
	after:h-[2px] ${currentPage === "home" && currentPageNavButtonStyle}`}
          >
            <motion.p whileTap={{ scale: 1.1 }}>Home</motion.p>
          </Link>
          <Link
            to={"/about"}
            onClick={() => setCurrentPage(Pages.about)}
            className={`hover:text-white after:absolute after:w-1/5 relative flex items-center justify-center duration-300 transition-all after:content-[''] after:-bottom-2 after:duration-300 after:transition-transform
	after:h-[2px] ${currentPage === "about" && currentPageNavButtonStyle}`}
          >
            <motion.p whileTap={{ scale: 1.1 }}>About</motion.p>
          </Link>
          <Link
            to={"/my-list"}
            onClick={(e) => handleGoToMyListPage(e)}
            className={`hover:text-white after:absolute after:w-1/5 relative flex items-center justify-center duration-300 transition-all after:content-[''] after:-bottom-2 after:duration-300 after:transition-transform
	after:h-[2px] ${currentPage === "myList" && currentPageNavButtonStyle}`}
          >
            <motion.p whileTap={{ scale: 1.1 }}>My List</motion.p>
          </Link>
        </div>
        {/* SIGN BUTTONS */}
        <div className="after:hidden flex items-center justify-center md:gap-4 text-sm md:text-base md:place-content-end mx-auto md:mx-0">
          {isUserLogged ? (
            <>
              <MotionLink
                to={"/"}
                onClick={() => logOut()}
                whileTap={{ scale: 1.1 }}
                className="grow md:grow-0 bg-emerald-200 rounded-xl border-emerald-200 border-2 duration-300 transition-colors hover:text-white after:absolute hover:bg-transparent text-[#121212] py-1 px-4 md:px-2 flex items-center justify-center gap-4 md:gap-2"
              >
                <h4>Log Out</h4>
              </MotionLink>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="grow md:grow-0 rounded-xl duration-300 transition-colors after:absolute  py-1 px-4 md:px-2 flex items-center justify-center gap-4 md:gap-2"
              >
                <UserIcon className="size-5 text-emerald-200" />
                <h4 className="min-w-[50px]">{userData.userName}</h4>
              </motion.button>
            </>
          ) : (
            <>
              <MotionLink
                to={"/sign-up"}
                whileTap={{ scale: 1.1 }}
                className="grow md:grow-0 bg-emerald-200 rounded-xl border-emerald-200 border-2 duration-300 transition-colors hover:text-white after:absolute hover:bg-transparent text-[#121212] py-1 px-4 md:px-2 flex items-center justify-center gap-4 md:gap-2"
              >
                <UserIconOutline className="size-5" />
                <h4>Sign Up</h4>
              </MotionLink>
              <MotionLink
                to={"/sign-in"}
                whileTap={{ scale: 1.1 }}
                className="grow md:grow-0 bg-emerald-200 rounded-xl border-emerald-200 border-2 duration-300 transition-colors hover:text-white after:absolute hover:bg-transparent text-[#121212] py-1 px-4 md:px-2 flex items-center justify-center gap-4 md:gap-2"
              >
                <UserIcon className="size-5" />
                <h4>Sign In</h4>
              </MotionLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
