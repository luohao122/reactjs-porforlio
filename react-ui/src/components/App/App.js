import React from "react";
import { Router } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import history from "../../services/history";
import Routes from "../../routes";
import Menu from "../Menu/Menu";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container component="main">
        <Router history={history}>
          <Menu />
          <Routes />
        </Router>
      </Container>
    </>
  );
};

export default App;
