import { getUser } from "@/api/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if (user) {
    return redirect("/dashboard");
  } else {
    return redirect("/login");
  }
}
