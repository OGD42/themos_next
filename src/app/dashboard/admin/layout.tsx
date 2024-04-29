import { isAdmin } from "~/libs/adminUtils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!isAdmin(userId)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
