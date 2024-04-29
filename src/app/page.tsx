import SignInForm from "@/components/SignInForm";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 z-10">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] w-[80%] lg:w-[60%]">
        <span className="text-blue-700">Themos.ai</span> is you personal
        migration assistant
      </h1>
      <SignInForm />
    </div>
  );
}
