import Logo from "./Logo";
import {
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  ListBulletIcon,
  MinusIcon,
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

const MotionLink = motion.create(Link);

const Navbar = ({ setCurrentPage, currentPage, isTopOfThePage }: Props) => {
  const navigate = useNavigate();
  const { isUserLogged, logOut, userData } = useGlobalContext();

  const handleGoToMyListPage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isUserLogged) {
      setCurrentPage(Pages.myList);
      navigate("my-list");
    } else {
      alert("Please log in to enter this page.");
    }
  };

  const linkClass = (page: string) =>
    `relative text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white
  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-emerald-200
  after:transition-all after:duration-300
  ${
    currentPage === page
      ? "text-white after:w-full"
      : "text-white/35 after:w-0 hover:after:w-full"
  }`;

  return (
    <div className="w-full flex items-center justify-center relative z-30">
      <nav
        className={`top-0 w-full flex md:grid grid-cols-3 items-center px-4 py-3 md:px-8 md:py-4 transition-all duration-500
          ${
            isTopOfThePage
              ? "absolute"
              : "fixed bg-[#0d0d0d]/80 backdrop-blur-md shadow-lg"
          }`}
      >
        {/* LOGO */}
        <div className="hidden md:flex items-center">
          <Logo />
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex flex-col items-center mx-auto gap-2">
          <Logo />
          <div className="flex items-center gap-3 text-[#59B38E]">
            <Link to="/" onClick={() => setCurrentPage(Pages.home)}>
              <HomeIcon
                className={`size-4 transition-all duration-300 ${
                  currentPage === "home" ? "text-emerald-200 scale-125" : ""
                }`}
              />
            </Link>
            <MinusIcon className="size-3 opacity-40" />
            <Link to="/about" onClick={() => setCurrentPage(Pages.about)}>
              <EllipsisHorizontalCircleIcon
                className={`size-4 transition-all duration-300 ${
                  currentPage === "about" ? "text-emerald-200 scale-125" : ""
                }`}
              />
            </Link>
            <MinusIcon className="size-3 opacity-40" />
            <Link to="/my-list" onClick={() => setCurrentPage(Pages.myList)}>
              <ListBulletIcon
                className={`size-4 transition-all duration-300 ${
                  currentPage === "myList" ? "text-emerald-200 scale-125" : ""
                }`}
              />
            </Link>
          </div>
        </div>

        {/* NAV LINKS — DESKTOP */}
        <div className="hidden md:flex items-center justify-center gap-8">
          <Link
            to="/"
            onClick={() => setCurrentPage(Pages.home)}
            className={linkClass("home")}
          >
            <motion.span whileTap={{ scale: 1.05 }}>Home</motion.span>
          </Link>
          <Link
            to="/about"
            onClick={() => setCurrentPage(Pages.about)}
            className={linkClass("about")}
          >
            <motion.span whileTap={{ scale: 1.05 }}>About</motion.span>
          </Link>
          <Link
            to="/my-list"
            onClick={(e) => handleGoToMyListPage(e)}
            className={linkClass("myList")}
          >
            <motion.span whileTap={{ scale: 1.05 }}>My List</motion.span>
          </Link>
        </div>
        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center justify-end gap-3">
          {isUserLogged ? (
            <>
              {/* USERNAME */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <UserIconOutline className="size-4 text-emerald-200" />
                <span>{userData.userName}</span>
              </div>
              {/* LOG OUT — ghost */}
              <MotionLink
                to="/"
                onClick={logOut}
                whileTap={{ scale: 1.03 }}
                className="text-sm border border-emerald-200/50 hover:border-emerald-200 text-emerald-200 hover:bg-emerald-200/10 rounded-lg py-1.5 px-4 transition-all duration-300"
              >
                Log Out
              </MotionLink>
            </>
          ) : (
            <>
              {/* SIGN IN — ghost */}
              <MotionLink
                to="/sign-in"
                whileTap={{ scale: 1.03 }}
                className="text-sm border border-white/20 hover:border-emerald-200/60 text-gray-300 hover:text-emerald-200 rounded-lg py-1.5 px-4 transition-all duration-300"
              >
                Sign In
              </MotionLink>
              {/* SIGN UP — filled, acción primaria */}
              <MotionLink
                to="/sign-up"
                whileTap={{ scale: 1.03 }}
                className="text-sm bg-emerald-200 hover:bg-emerald-300 text-[#121212] font-semibold rounded-lg py-1.5 px-4 transition-all duration-300"
              >
                Sign Up
              </MotionLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
