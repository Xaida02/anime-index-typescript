import { ThreeDots } from "react-loader-spinner";

// type Props = {};

const Loading = () => {
  return (
    <section className="h-screen my-20 md:h-auto flex w-screen">
      <div className="m-auto text-[40px] flex items-center gap-4 animate-pulse">
        <p className="inline-block text-emerald-200"> LOADING</p>{" "}
        <ThreeDots color="#A7F3D0" />
      </div>
    </section>
  );
};

export default Loading;
