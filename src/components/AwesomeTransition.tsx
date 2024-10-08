import { motion } from "framer-motion";

const AwesomeTransition = <P extends object>(
  OriginalComponent: React.ComponentType<P>
) => {
  return (props: P) => (
    <>
      <OriginalComponent {...props} />
      <motion.div
        //   SLIDE IN
        className="fixed top-0 left-0 w-full h-screen bg-[#121212] origin-bottom z-50"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        //   SLIDE OUT
        className="fixed top-0 left-0 w-full h-screen bg-[#121212] origin-top z-50"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default AwesomeTransition;
