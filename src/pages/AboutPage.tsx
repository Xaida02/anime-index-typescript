import AboutPageBg from "../assets/AboutPageBg.png";
import PageLogo from "../assets/AnimeIndexLogo.png";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <>
      {/* BACKGROUND IMAGE */}
      <div className="absolute w-full h-full z-[-1] animate-appear">
        <img
          className="w-full h-full object-cover absolute z-[-3] filter blur-sm"
          src={AboutPageBg}
          alt="Blurred background cover"
        />
        <div className="w-full h-full z-[-2] absolute bg-black/80" />
      </div>
      <section className="h-screen flex items-center justify-center">
        <div className="w-full p-5 md:p-10 flex flex-col lg:flex-row items-center justify-between">
          <motion.div className="w-full md:w-1/2 p-5 md:p-10 relative">
            {/* 1 */}
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                delay: 0.3,
              }}
              className="text-2xl md:text-3xl md:w-1/2 mx-auto text-emerald-200"
            >
              About
            </motion.h1>
            {/* 2 */}
            <motion.p
              initial={{ x: "-50px", opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                type: "spring",
                stiffness: 50,
              }}
              className="w-full md:w-1/2 mx-auto"
            >
              This page was built using React and showcases a comprehensive list
              of anime sourced from an external API. User data is stored via
              Firebase to display saved anime selections. The primary goal of
              this project is to serve as a demonstration of my front-end
              development skills.
              <div />
              Feel free to reach out via email if you have any questions:{" "}
              <span className="text-emerald-200">
                tejada.v.tobias@gmail.com
              </span>
            </motion.p>
          </motion.div>
          <div className="w-full md:w-1/2 p-5 md:p-10 mt-10 md:mt-0 flex flex-col items-center justify-center">
            {/* 3 */}
            <motion.img
              initial={{ x: 100, opacity: 0, filter: "blur(5px)" }}
              viewport={{ once: true }}
              whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 50,
              }}
              className="w-[250px]"
              alt="Page logo"
              src={PageLogo}
            />
            {/* 4 */}
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                delay: 0.3,
              }}
              className="text-lg my-4"
            >
              Data of all existent{" "}
              <span className="inline text-emerald-200">animes</span>
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
