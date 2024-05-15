import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import QuestionCarousel from "./_components/QuestionsCarousel";

export default function Home() {
  return (
    <div className="container flex h-screen flex-col lg:flex-row items-center justify-center gap-12 px-4 py-16 z-10">
      <div className="flex flex-1 flex-col justify-center items-start">
        <h1 className="text-5xl font-extrabold sm:text-[5rem] py-2">
          <span className="text-blue-700">Themos.ai</span> is your AI migration
          assistant.
        </h1>
        <h3 className="text-2xl py-2">
          Discover your ideal visa or residence – tailored guidance to match
          your unique needs for a smooth relocation.
        </h3>
        <StyledFirebaseAuth />
      </div>
      <div className="flex flex-col justify-center items-center lg:items-start bg-slate-700 rounded-small p-4">
        <h2 className="text-3xl">What can I ask to Themos?</h2>
        <QuestionCarousel slides={Array.from(Array(5).keys())} />
      </div>
    </div>
  );
}
