import { motion } from "framer-motion";

const Loading = () => {
  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* TRES BARRAS ANIMADAS */}
        <div className="flex items-end gap-1.5 h-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-emerald-200"
              animate={{
                height: ["8px", "32px", "8px"],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* TEXTO */}
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs tracking-[0.3em] uppercase text-white/30 font-light"
        >
          Loading
        </motion.p>
      </div>
    </section>
  );
};

export default Loading;
