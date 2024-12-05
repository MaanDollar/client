"use client";

import Centering from "@/components/Centering";
import { Button, Stack, styled } from "@mui/joy";

import Image from "next/image";
import imgKakao from "./kakao.png";

const LoginContainer = styled(Centering)`
  height: 100%;
`;

const LogoImage = styled("img")`
  display: block;
  width: 80%;
  max-width: 12rem;
  height: auto;
`;

const Page = () => {
  return (
    <LoginContainer>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <LogoImage src="/logo.svg" alt="logo" />
        <Button
          component="a"
          href="https://costockco.com/api/auth/kakao/login/?process=login"
          fullWidth
          sx={{
            px: 6,
            py: 2,
            backgroundColor: "#FFEB00",
            color: "#000000",
            ":hover": {
              backgroundColor: "#dfcc00",
              color: "#000000",
            },
          }}
          startDecorator={
            <Image src={imgKakao} width={20} height={20} alt="Kakao logo" />
          }
        >
          카카오 로그인
        </Button>
      </Stack>
    </LoginContainer>
  );
};

export default Page;
