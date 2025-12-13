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

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {path === "/" && authenticated ? (
            <Grid container>
              <Grid sx={{ md: 3 }}>
                <ChatList />
              </Grid>
              <Grid sx={{ md: 9 }}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <Snackbars />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};
export default App;

