import { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";
import { getUser } from "@/api/user";
import { redirect } from "next/navigation";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <ClientLayout>{children}</ClientLayout>;
};

export default Layout;
