import VectorizeForm from "./_components/VectorizeForm";

export default function AdminPage() {
  return (
    <div className="flex w-screen flex-col p-10">
      <h1 className="py-4 text-center text-5xl font-bold">
        Admin: Add text to training
      </h1>
      <VectorizeForm />
    </div>
  );
}
