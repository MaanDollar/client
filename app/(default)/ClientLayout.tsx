"use client";

import Contents from "@/components/Contents";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  Button,
  Sheet,
  Stack,
  styled,
  Tab,
  tabClasses,
  TabList,
  Tabs,
} from "@mui/joy";
import {
  IconChartBarPopular,
  IconChevronLeft,
  IconSettings,
  IconSparkles,
  IconStar,
} from "@tabler/icons-react";
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

const BottomNav = styled(Sheet)`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.body};
  z-index: 1000;
`;

const ProfileImage = styled(PlaceholderImage)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const resolveTabValue = (pathname: string) => {
  if (/^\/dashboard\/?/.test(pathname)) return "/dashboard";
  if (/^\/interest\/?/.test(pathname)) return "/dashboard";
  if (/^\/stock\/?/.test(pathname)) return "/stock";
  if (/^\/settings\/?/.test(pathname)) return "/settings";
  return "/";
};

const ClientLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const hasHistory = !/^\/(dashboard|interest)\/?/.test(pathname);

  return (
    <>
      <TopBar>
        <Contents>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={0} alignItems="center">
              {hasHistory && (
                <Button
                  component={Link}
                  variant="plain"
                  href="/dashboard"
                  sx={{
                    minWidth: 0,
                    padding: 0,
                    aspectRatio: 1,
                    borderRadius: "50%",
                  }}
                >
                  <IconChevronLeft />
                </Button>
              )}
              <Button
                component={Link}
                variant="plain"
                href="/dashboard"
                sx={{
                  minWidth: 0,
                  padding: 0.5,
                  aspectRatio: 1,
                  borderRadius: "50%",
                }}
              >
                <ProfileImage h={64} w={64} alt="profile" />
              </Button>
            </Stack>
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
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <BottomNav>
        <Tabs
          sx={{
            fontWeight: "bold",
            [`& .${tabClasses.root}`]: {
              bgcolor: "background.body",
              padding: "1em",
              [`&[aria-selected="true"]`]: {
                bgcolor: "background.surface",
                border: "none",
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
          value={resolveTabValue(pathname)}
        >
          <TabList tabFlex={1}>
            <Tab
              component={Link}
              indicatorPlacement="top"
              value="/dashboard"
              href="/dashboard"
            >
              <IconStar />
            </Tab>
            <Tab
              component={Link}
              indicatorPlacement="top"
              value="/stock"
              href="/stock"
            >
              <IconSparkles />
            </Tab>
            <Tab
              component={Link}
              indicatorPlacement="top"
              value="/settings"
              href="/settings"
            >
              <IconSettings />
            </Tab>
          </TabList>
        </Tabs>
      </BottomNav>
    </>
  );
};

export default ClientLayout;
