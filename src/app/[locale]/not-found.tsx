import Link from "next/link";
import Logo from "./_components/logo";

export default function NotFound() {
  return (
    <div>
      <Logo />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
