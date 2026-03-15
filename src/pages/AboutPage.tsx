import AboutPageBg from "../assets/AboutPageBg.png";
import PageLogo from "../assets/AnimeIndexLogo.png";
import { motion } from "framer-motion";

const STACK = [
  { label: "React", sub: "UI Framework" },
  { label: "TypeScript", sub: "Language" },
  { label: "Tailwind CSS", sub: "Styling" },
  { label: "Firebase", sub: "Auth & DB" },
  { label: "Framer Motion", sub: "Animations" },
  { label: "Jikan API", sub: "Data Source" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const AboutPage = () => {
  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        <img
          className="w-full h-full object-cover blur-sm scale-105"
          src={AboutPageBg}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/70 via-[#121212]/85 to-[#121212]" />
      </div>

      <section className="min-h-screen w-full max-w-[900px] mx-auto px-6 py-32 flex flex-col justify-center gap-20">
        {/* HERO BLOCK */}
        <div className="flex flex-col gap-6">
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-emerald-200 rounded-full" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/30 font-light">
              About this project
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-4xl md:text-6xl font-black leading-tight tracking-tight"
          >
            Anime{" "}
            <span className="text-emerald-200 relative inline-block">
              Index
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-200/0 via-emerald-200 to-emerald-200/0 rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-white/50 text-base md:text-lg leading-relaxed max-w-[600px] font-light"
          >
            A full-stack web app for discovering and saving anime, built as a
            demonstration of modern front-end development. It pulls live data
            from the Jikan API and uses Firebase for authentication and
            persistent user lists.
          </motion.p>
        </div>

        {/* DIVIDER */}
        <motion.div
          {...fadeUp(0.35)}
          className="w-full h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"
        />

        {/* TECH STACK */}
        <div className="flex flex-col gap-6">
          <motion.div {...fadeUp(0.4)} className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-white/20 rounded-full" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/25 font-light">
              Built with
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STACK.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(0.45 + i * 0.05)}
                className="flex flex-col gap-0.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-200/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <span className="text-sm font-semibold text-white/80">
                  {item.label}
                </span>
                <span className="text-xs text-white/25">{item.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <motion.div
          {...fadeUp(0.7)}
          className="w-full h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"
        />

        {/* CONTACT + LOGO */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <motion.div {...fadeUp(0.75)} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-white/20 rounded-full" />
              <span className="text-xs tracking-[0.2em] uppercase text-white/25 font-light">
                Contact
              </span>
            </div>
            <p className="text-white/40 text-sm font-light">
              Questions or feedback?
            </p>
            <a
              href="mailto:tejada.v.tobias@gmail.com"
              className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300 text-sm font-medium"
            >
              tejada.v.tobias@gmail.com
            </a>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={PageLogo}
            alt="Anime Index logo"
            className="w-[140px] opacity-40 hover:opacity-70 transition-opacity duration-500"
          />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
