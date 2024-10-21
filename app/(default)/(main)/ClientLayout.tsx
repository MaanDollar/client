"use client";

import { Tab, tabClasses, TabList, Tabs } from "@mui/joy";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
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
      >
        <TabList tabFlex={1}>
          <Tab indicatorPlacement="top">보유종목</Tab>
          <Tab indicatorPlacement="top">관심종목</Tab>
        </TabList>
      </Tabs>
      {children}
    </>
  );
};

export default ClientLayout;
