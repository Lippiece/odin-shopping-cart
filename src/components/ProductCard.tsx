import Close from "@mui/icons-material/Close";
import { CardHeader, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Product from "../@types/Product";
import { useCartDispatch } from "../context/CartContext";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch                        = useCartDispatch();
  const [ imageSource, setImageSource ] = useState(product.imageUrl);

  useEffect(() => {
    const updateImage = async () => {
      const source = await import(`../data/images/${product.imageUrl}.png`);
      console.log(source.default);
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
          right    : 0,
          top      : "50%",
          transform: "translateY(-50%)",
          zIndex   : 1,
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
            onClick={() =>
              dispatch({
                payload: {
                  product,
                  quantity: 1,
                },
                type: "added",
              })
            }
          >
            Add to cart
          </Button>
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
