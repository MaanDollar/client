import { getUser } from "@/api/user";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return <ClientLayout>{children}</ClientLayout>;
};

export default Layout;
