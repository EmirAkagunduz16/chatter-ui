import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface ChatListHeaderProps {
  handleAddChat: () => void;
}

const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
