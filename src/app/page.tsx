import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";

export default function Home() {
  return (
    <div className="container flex h-screen flex-col lg:flex-row items-center justify-center gap-12 px-4 py-16 z-10">
      <div className="flex flex-1">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] w-[80%] lg:w-[60%]">
          <span className="text-blue-700">Themos.ai</span> is you personal
          migration assistant
        </h1>
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="text-3xl my-3">
          Do you want to migrate to Canada? We can help!
        </h2>
        <StyledFirebaseAuth />
      </div>
    </div>
  );
}
