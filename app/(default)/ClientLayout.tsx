"use client";

import Contents from "@/components/Contents";
import PlaceholderImage from "@/components/PlaceholderImage";
import { Button, Sheet, Stack, styled } from "@mui/joy";
import { IconChartBarPopular, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <>
      <TopBar>
        <Contents>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Link href="/dashboard">
              <ProfileImage h={64} w={64} alt="profile" />
            </Link>
            {pathname.includes("stock") ? (
              <Button
                component={Link}
                href="/dashboard"
                startDecorator={<IconChartBarPopular />}
                variant="plain"
              >
                보유/관심 종목
              </Button>
            ) : (
              <Button
                component="a"
                href="/stock"
                startDecorator={<IconSparkles />}
              >
                AI 리포트
              </Button>
            )}
          </Stack>
        </Contents>
      </TopBar>
      {children}
    </>
  );
};

export default ClientLayout;
