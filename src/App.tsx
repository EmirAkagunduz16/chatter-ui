import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client/react";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbars from "./components/snackbar/Snackbar";
import { ChatList } from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";
import { useReactiveVar } from "@apollo/client/react";
import authenticatedVar from "./constants/authenticated";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { path } = usePath();
  const authenticated = useReactiveVar(authenticatedVar);

  const showChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container sx={{ maxWidth: "xl", marginTop: "1rem" }}>
            {showChatList && authenticated ? (
              <Grid container spacing={5}>
                <Grid sx={{ xs: 12, md: 5, lg: 4, xl: 3 }}>
                  <ChatList />
                </Grid>
                <Grid
                  sx={{
                    xs: 12,
                    md: 7,
                    lg: 8,
                    xl: 9,
                    maxWidth: "100%",
                    width: "100%",  
                    flex: 1
                  }}
                >
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <Snackbars />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return <RouterProvider router={router} />;
};
export default App;
