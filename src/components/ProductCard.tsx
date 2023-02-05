import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useCartDispatch } from "../context/CartContext";
import Product from "../@types/Product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useCartDispatch();
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {product.name}
          </Typography>
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
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
