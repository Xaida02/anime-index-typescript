import { Link, useNavigate } from "react-router-dom";
import SignInUp from "../assets/SignUpPageBg.webp";
import { useState } from "react";
import { useGlobalContext } from "../shared/context";

const SignInPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const { signUp } = useGlobalContext();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      signUp(userEmail, userPassword, userUsername);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full h-full min-h-screen relative flex my-16 md:my-0">
      <div className="m-auto bg-[#121212]/90 min-h-[450px] md:border-2 border-gray-500/30 p-12 rounded-xl ">
        <h1 className="text-2xl py-4">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          action="submit"
          className="grid gap-4 z-[1] text-gray-200"
        >
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="E-mail"
            required
            type="text"
            className="duration-300 w-full p-2 focus:outline-none ring-gray-500/40 ring-2 focus:ring-emerald-200 rounded-md bg-[#1b1b1b]"
          />
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            required
            type="password"
            className="duration-300 w-full p-2 focus:outline-none ring-gray-500/40 ring-2 focus:ring-emerald-200 rounded-md bg-[#1b1b1b]"
          />
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
            className="duration-300 w-full p-2 focus:outline-none ring-gray-500/40 ring-2 focus:ring-emerald-200 rounded-md bg-[#1b1b1b]"
          />
          <button
            type="submit"
            className=" w-full p-2 ring-2 text-[#121212] ring-emerald-200/40 hover:ring-emerald-200 rounded-md bg-emerald-200 hover:bg-transparent hover:text-white duration-300"
          >
            Submit
          </button>
          <div className="flex justify-between w-full p-2 text-sm">
            <p className="flex items-center gap-2">
              Remember me <input type="checkbox" />
            </p>
            <p className="text-gray-400 cursor-pointer select-none">
              Need help?
            </p>
          </div>
          <div className="flex items-center  justify-between w-full p-2">
            <p className="text-sm">Already have an account?</p>
            <Link
              className="text-emerald-200 duration-300 hover:text-[#59B38E]"
              to={"/sign-in"}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
      {/* BLURRED IMAGE BACKROUND */}
      <div className="w-full h-full absolute z-[-1] overflow-hidden animate-appear">
        <img
          className="w-full h-full object-fill absolute z-[-3] filter blur-sm"
          src={SignInUp}
          alt="Blurred background cover"
        />
        <div className="w-full h-full z-[-2] absolute bg-[#121212] md:bg-black/80" />
      </div>
    </section>
  );
};

export default SignInPage;
