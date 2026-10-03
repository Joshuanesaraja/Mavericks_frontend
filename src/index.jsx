import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import App from "./App";
import store from "./app/store";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import GlobalStyles from "./themes/GlobalStyles";

function AppTheme() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </StyledThemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AppTheme />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);