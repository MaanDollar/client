"use client";

import { defaultFont } from "@/styles/font";
import { Global, ThemeProvider } from "@emotion/react";
import { CssBaseline, CssVarsProvider, extendTheme, styled } from "@mui/joy";
import { PropsWithChildren } from "react";

const theme = extendTheme({
  fontFamily: {
    body: defaultFont,
    display: defaultFont,
  },
});

const Container = styled("div")`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  max-width: ${(100 / 4) * 3}vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.background.body};
`;

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CssVarsProvider>
        <Global
          styles={{
            html: {
              height: "100%",
              fontSize: "calc(0.75rem + 1vw)",
            },
            body: {
              backgroundColor: theme.palette.background.backdrop,
              height: "100%",
            },
          }}
        />
        <Container>{children}</Container>
      </CssVarsProvider>
    </ThemeProvider>
  );
};

export default ClientLayout;
