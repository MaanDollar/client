import { listAllStocks } from "@/api/stock";
import { getUser } from "@/api/user";
import { SiteProvider } from "@/contexts/SiteContext";
import { UserProvider } from "@/contexts/UserContext";
import axios from "axios";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

axios.defaults.baseURL = "https://costockco.com";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, stocks] = await Promise.all([getUser(), listAllStocks()]);

  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
        />
      </head>
      <body>
        <UserProvider user={user}>
          <SiteProvider stocks={stocks}>
            <ClientLayout>{children}</ClientLayout>
          </SiteProvider>
        </UserProvider>
      </body>
    </html>
  );
}
