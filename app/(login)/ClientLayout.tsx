"use client";

import Contents from "@/components/Contents";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Contents sx={{ height: "100%" }}>{children}</Contents>
    </>
  );
};

export default ClientLayout;
