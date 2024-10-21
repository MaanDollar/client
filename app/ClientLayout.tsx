"use client";

import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { defaultFont } from "@/styles/font";
import { Global, ThemeProvider } from "@emotion/react";
import { CssBaseline, CssVarsProvider, extendTheme, styled } from "@mui/joy";
import { PropsWithChildren } from "react";

const materialTheme = materialExtendTheme();
const theme = extendTheme({
  fontFamily: {
    body: defaultFont,
    display: defaultFont,
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <CssVarsProvider>
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
        </CssVarsProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
};

export default ClientLayout;
