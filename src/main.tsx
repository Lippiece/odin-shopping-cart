import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Card from "./components/Card";
import products from "./data/items.json";
import Cart from "./routes/Cart";
import Home from "./routes/Home";
import Products from "./routes/Products";

const theme = createTheme({
  palette: {
    background: {
      default: "#121212",
      paper  : "#1f1f1f",
    },
    mode   : "dark",
    primary: {
      main: "#ff3d00",
    },
    secondary: {
      main: "#ff9e80",
    },
  },
  typography: {
    fontFamily: '"Rubik", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const root   = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/products"
        element={<Products />}
      >
        {products.map((product: any) => (
          <Route
            path={`/products/${product.id}`}
            element={<Card item={product} />}
            key={product.id}
          />
        ))}
      </Route>
      <Route
        path="/cart"
        element={<Cart />}
      />
    </Route>
  )
);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
