type Props = {};
import { Link, useNavigate } from "react-router-dom";
import SignInBg from "../assets/SignInBg.png";
import { useGlobalContext } from "../shared/context";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SignInPage = (props: Props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [failedToLogIn, setFailedToLogIn] = useState(false);

  const { signIn, isUserLogged } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signIn(userEmail, userPassword);
    if (isUserLogged === false) {
      setFailedToLogIn(true);
    }
  };

  // NAVIGATE TO HOMEPAGE IF THE USER IS LOGGED
  useEffect(() => {
    if (isUserLogged === true) {
      navigate("/");
    }
  }, [isUserLogged]);

  return (
    <section className="w-full h-full min-h-screen relative flex my-16 md:my-0">
      <div className="m-auto bg-[#121212]/90 min-h-[450px] md:border-2 border-gray-500/30 p-12 rounded-xl">
        <h1 className="text-2xl py-4">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          action="submit"
          className="grid gap-4 z-[1]"
        >
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            autoComplete="email"
            placeholder="E-mail"
            required
            type="email"
            className="duration-300 w-full p-2 focus:outline-none ring-gray-500/40 ring-2 focus:ring-emerald-200 rounded-md bg-[#1b1b1b]"
          />
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="duration-300 w-full p-2 focus:outline-none ring-gray-500/40 ring-2 focus:ring-emerald-200 rounded-md bg-[#1b1b1b]"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 1.028 }}
            transition={{ duration: 0.1 }}
            className=" w-full p-2 ring-2 text-[#121212] ring-emerald-200/40 hover:ring-emerald-200 rounded-md bg-emerald-200 hover:bg-transparent transition-colors duration-300 hover:text-white"
          >
            Submit
          </motion.button>
          {failedToLogIn && (
            <motion.p
              className="text-sm text-red-500/70"
              initial={{ display: "hidden", opacity: 0, height: "0px" }}
              animate={{ display: "flex", opacity: 1, height: "auto" }}
              transition={{ delay: 2, duration: 0.3 }}
            >
              Incorrect email or password.
            </motion.p>
          )}
          <div className="flex justify-between w-full p-2 text-sm">
            <p className="flex items-center gap-2">
              Remember me <input type="checkbox" />
            </p>
            <p className="text-gray-400 cursor-pointer select-none">
              Need help?
            </p>
          </div>
          <div className="flex items-center  justify-between w-full p-2">
            <p className="text-sm">Don't have an account yet?</p>
            <Link
              className="text-emerald-200 duration-300 hover:text-[#59B38E]"
              to={"/"}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      {/* BLURRED IMAGE BACKROUND */}
      <div className="w-full h-full absolute z-[-1] overflow-hidden animate-appear">
        <img
          className="w-full h-full object-fill absolute z-[-3] filter blur-sm"
          src={SignInBg}
          alt="Blurred background cover"
        />
        <div className="w-full h-full z-[-2] absolute bg-[#121212] md:bg-black/80" />
      </div>
    </section>
  );
};

export default SignInPage;
