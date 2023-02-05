import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Product from "./@types/Product";
import App from "./App";
import ProductCard from "./components/ProductCard";
import { CartProvider } from "./context/CartContext";
import productsJSON from "./data/items.json";
import Cart from "./routes/Cart";
import Home from "./routes/Home";
import Products from "./routes/Products";

const products: Product[] = productsJSON;

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
      path="/odin-shopping-cart"
      element={<App />}
    >
      <Route
        path="/odin-shopping-cart"
        element={<Home />}
      />
      <Route
        path="/odin-shopping-cart/products"
        element={<Products />}
      >
        {products.map(product => (
          <Route
            path={`/odin-shopping-cart/products/${product.id}`}
            element={<ProductCard product={product} />}
            key={product.id}
          />
        ))}
      </Route>
      <Route
        path="/odin-shopping-cart/cart"
        element={<Cart />}
      />
    </Route>
  )
);

root.render(
  <StrictMode>
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CartProvider>
  </StrictMode>
);

export default router;
