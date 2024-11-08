"use client";

import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { defaultFont } from "@/styles/font";
import { Global, ThemeProvider } from "@emotion/react";
import { CssBaseline, CssVarsProvider, extendTheme, styled } from "@mui/joy";
import { PropsWithChildren, useEffect } from "react";

const materialTheme = materialExtendTheme();
const theme = extendTheme({
  fontFamily: {
    body: defaultFont,
    display: defaultFont,
  },
  components: {
    JoyModal: {
      styleOverrides: {
        root: {
          width: `${(100 / 4) * 3}vh`,
          maxWidth: "100%",
          left: "50% !important",
          transform: "translateX(-50%) !important",
          right: "unset",
        },
      },
    },
    JoyModalDialog: {
      defaultProps: {
        layout: "fullscreen",
      },
    },
  },
});

const Container = styled("div")`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  max-width: ${(100 / 4) * 3}vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.background.surface};
`;

const ClientLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if ("virtualKeyboard" in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).virtualKeyboard.overlaysContent = true;
    }
  }, []);

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <CssVarsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global
            styles={{
              html: {
                height: "100%",
                fontSize: "calc(0.75rem + 1vmin)",
              },
              body: {
                backgroundColor: theme.palette.background.backdrop,
                height: "100%",
              },
            }}
          />
          <Container>{children}</Container>
        </ThemeProvider>
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default ClientLayout;
