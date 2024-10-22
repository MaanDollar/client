"use client";

import { Tab, tabClasses, TabList, Tabs } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      <Tabs
        sx={{
          fontWeight: "bold",
          [`& .${tabClasses.root}`]: {
            bgcolor: "background.body",
            [`&[aria-selected="true"]`]: {
              bgcolor: "background.surface",
              borderColor: "divider",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                height: 2,
                bottom: -2,
                left: 0,
                right: 0,
                bgcolor: "background.surface",
              },
            },
          },
        }}
        value={pathname}
      >
        <TabList tabFlex={1}>
          <Tab
            component={Link}
            indicatorPlacement="top"
            value="/dashboard"
            href="/dashboard"
          >
            보유종목
          </Tab>
          <Tab
            component={Link}
            indicatorPlacement="top"
            value="/interest"
            href="/interest"
          >
            관심종목
          </Tab>
        </TabList>
      </Tabs>
      {children}
    </>
  );
};

export default ClientLayout;
