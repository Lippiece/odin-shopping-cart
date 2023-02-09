import Close from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Product from "../@types/Product";
import { useCartDispatch } from "../context/CartContext";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch                          = useCartDispatch();
  const [ imageSource, setImageSource ]   = useState(product.imageUrl);
  const [ snackbarOpen, setSnackbarOpen ] = useState(false);

  useEffect(() => {
    const updateImage = async () => {
      const source = await import(`../data/images/${product.imageUrl}.png`);
      setImageSource(source.default);
    };
    updateImage();
  }, [ product.imageUrl ]);
  return (
    <>
      <Card
        sx={{
          maxWidth : 345,
          position : "fixed",
          right    : "2%",
          top      : "80%",
          transform: "translateY(-80%)",
          zIndex   : 2,
        }}
      >
        <CardHeader
          title={product.name}
          subheader={`$${product.price}`}
        />
        <CardMedia
          component="img"
          height="300"
          image={imageSource}
          alt={product.name}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setSnackbarOpen(true);
              return dispatch({
                payload: {
                  product,
                  quantity: 1,
                },
                type: "added",
              });
            }}
          >
            Add to cart
          </Button>
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            autoHideDuration={6000}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <Alert severity="success">Added to cart</Alert>
          </Snackbar>
          <Button size="small">
            <Link to="/odin-shopping-cart/products">
              <Close />
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
