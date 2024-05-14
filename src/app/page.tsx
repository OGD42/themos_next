import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";

export default function Home() {
  return (
    <div className="container flex h-screen flex-col lg:flex-row items-center justify-center gap-12 px-4 py-16 z-10">
      <div className="flex flex-1 flex-col justify-center items-start">
        <h1 className="text-5xl font-extrabold sm:text-[5rem] text-blue-700">
          Themos.ai
        </h1>
        <span className="text-2xl">
          {" "}
          Move to your dream country, discover your ideal visa or residence –
          tailored guidance to match your unique needs for a smooth relocation.
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="text-3xl my-3">Ready to know more?</h2>
        <StyledFirebaseAuth />
      </div>
    </div>
  );
}
