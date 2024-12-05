import { List, ListItem, ListItemButton } from "@mui/joy";

const ClientPage = () => {
  return (
    <List>
      <ListItem component="a" href="/api/auth/logout/">
        <ListItemButton>로그아웃</ListItemButton>
      </ListItem>
    </List>
  );
};

export default ClientPage;
