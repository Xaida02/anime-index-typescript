import { Link, useNavigate } from "react-router-dom";
import SignInBg from "../assets/SignInBg.png";
import { useGlobalContext } from "../shared/context";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [failedToLogIn, setFailedToLogIn] = useState(false);

  const { signIn, isUserLogged } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signIn(userEmail, userPassword);
    if (!isUserLogged) setFailedToLogIn(true);
  };

  useEffect(() => {
    if (isUserLogged) navigate("/");
  }, [isUserLogged]);

  return (
    <section className="w-full min-h-screen relative flex items-center justify-center">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        <img
          className="w-full h-full object-cover blur-sm scale-105"
          src={SignInBg}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 via-[#121212]/80 to-[#121212]" />
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[400px] mx-4 bg-[#161616]/90 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 flex flex-col gap-6"
      >
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-4 h-[2px] bg-emerald-200 rounded-full" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-light">
              Welcome back
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">Sign In</h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            autoComplete="email"
            placeholder="E-mail"
            required
            type="email"
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.12] focus:border-emerald-200/40 focus:bg-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300"
          />
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.12] focus:border-emerald-200/40 focus:bg-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300"
          />

          {failedToLogIn && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400/70 px-1"
            >
              Incorrect email or password.
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 mt-1 bg-emerald-200 hover:bg-emerald-300 text-[#121212] font-semibold text-sm rounded-xl transition-colors duration-300"
          >
            Sign In
          </motion.button>
        </form>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <p className="text-xs text-white/25">Don't have an account?</p>
          <Link
            to="/sign-up"
            className="text-xs text-emerald-200/70 hover:text-emerald-200 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default SignInPage;
