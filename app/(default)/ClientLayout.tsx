"use client";

import Contents from "@/components/Contents";
import PlaceholderImage from "@/components/PlaceholderImage";
import { Sheet, styled } from "@mui/joy";
import { PropsWithChildren } from "react";

const TopBar = styled(Sheet)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.palette.background.body};
  z-index: 1000;
`;

const ProfileImage = styled(PlaceholderImage)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TopBar>
        <Contents>
          <ProfileImage h={64} w={64} alt="profile" />
        </Contents>
      </TopBar>
      {children}
    </>
  );
};

export default ClientLayout;
