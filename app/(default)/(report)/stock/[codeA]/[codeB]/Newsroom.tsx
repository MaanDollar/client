"use client";

import { MOCK_NEWS } from "@/types/News";
import {
  Button,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/joy";
import { styled } from "@mui/material";
import { Fragment, useMemo, useState } from "react";

const NewsImage = styled("img")`
  width: 6rem;
  height: 4rem;
  object-fit: cover;
`;

const Newsroom = () => {
  const [shownItems, setShownItems] = useState(3);
  const news = useMemo(() => {
    return MOCK_NEWS.concat(MOCK_NEWS).concat(MOCK_NEWS).concat(MOCK_NEWS);
  }, []);

  return (
    <>
      <Typography level="title-lg">관련기사</Typography>
      <List>
        {news.slice(0, shownItems).map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <ListDivider />}
            <ListItem
              sx={{
                px: 0,
                textDecoration: "none",
              }}
            >
              <ListItemButton
                component="a"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <Stack
                  direction="row"
                  spacing={2}
                  minWidth={0}
                  alignItems="center"
                >
                  {item.imageSrc && (
                    <NewsImage src={item.imageSrc} alt={item.title} />
                  )}
                  <Stack spacing={0} flex="1" minWidth={0}>
                    <Stack direction="row" spacing={2}>
                      <Typography level="body-sm">{item.date}</Typography>
                      <Typography level="body-sm" textColor="text.tertiary">
                        {item.journal}
                      </Typography>
                    </Stack>
                    <Typography level="title-sm" noWrap>
                      {item.title}
                    </Typography>
                    <div style={{ height: "0.5rem" }} />
                    <Typography level="body-sm" noWrap>
                      {item.content}
                    </Typography>
                  </Stack>
                </Stack>
              </ListItemButton>
            </ListItem>
          </Fragment>
        ))}
        {shownItems < news.length && (
          <>
            <div style={{ height: "0.5rem" }} />
            <Button
              onClick={() => setShownItems((prev) => prev + 3)}
              sx={{ width: "100%" }}
            >
              더보기
            </Button>
          </>
        )}
      </List>
    </>
  );
};

export default Newsroom;
