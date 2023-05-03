import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { apiCall } from "@/utils/apiCall";
import { toast } from "react-toastify";

export default function ProductCard({ product = {}, handleClick }) {
  const { width } = useWindowSize();
  const truncate = (input, length) =>
    input?.length > length ? `${input.substring(0, length)}...` : input;
  const handleCard = (product) => {
    handleClick(product);
  };

  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;

  const handleAddToCart = async (e, product, userId, quantity = 1) => {
    e.stopPropagation();
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");

    if (product?.inStock === 0) {
      return toast.error("Item is out of stock.");
    }
    if (token && state?.auth?.isVerified) {
      const data = [
        {
          productId: product?._id,
          quantity: quantity,
        },
      ];
      if (product?.inStock < quantity) {
        return toast.error("Item is out of stock.");
      }
      const res = await apiCall("POST", `cart/${auth?.user?.id}`, token, data);
      if (res?.data?.status === "success") {
        toast.success("Added to cart");

        const getCart = await apiCall("GET", `cart/${auth?.user?.id}`, token);
        const totalQuantity = getCart?.data?.Data?.cart?.[0]?.products?.reduce(
          (acc, curr) => acc + curr?.quantity,
          0
        );
        const totalAmount = getCart?.data?.Data?.totalAmount;
        return dispatch(addToCart("", "", totalQuantity, totalAmount));
      }
    } else {
      const cartId =
        typeof window !== "undefined" ? localStorage.getItem("cartId") : "";
      const data = {
        cartId: cartId,
        products: [
          {
            productId: product?._id,
            quantity: quantity,
          },
        ],
      };
      const res = await apiCall("POST", `cart`, "", data);

      if (res?.data?.status === "success") {
        toast.success("Added to cart");
        localStorage.setItem("cartId", res?.data?.Data?._id);
        if (cartId !== null) {
          const getCart = await apiCall("GET", `cart/guest/${cartId}`);

          const totalQuantity = getCart?.data?.Data?.[0]?.products?.reduce(
            (acc, curr) => acc + curr?.quantity,
            0
          );
          return dispatch(addToCart("", "", totalQuantity));
        }
      }
    }
  };

  return (
    <Card
      sx={{
        width: { xs: "300px", sm: "250px", md: "250px" },
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "white",
        boxShadow: "1px 8px 8px whitesmoke",
        "-webkit-transition": "box-shadow .2s ease-in",
        "&:hover": {
          transform: "scale(1.01)",
        },
        padding: "10px",
      }}
      elevation={0}
      onClick={() => handleCard(product)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="275"
          image={product?.images?.[0]?.url}
          alt="green iguana"
        />
        <CardContent
          sx={{
            padding: "5px 8px",
          }}
        >
          <Typography
            gutterBottom
            // variant="h6"
            component="div"
            sx={{
              width: "100%",
              fontSize: "20px",
              letterSpacing: "1.5px",
              fontWeight: 500,
            }}
          >
            {width > 700
              ? truncate(product?.title, 22)
              : truncate(product?.title, 13)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {product?.discountPrice && (
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "18px", color: "#acb1b2" }}
                >
                  ₹ {product?.discountPrice}
                </Typography>
              )}
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "18px",
                  color: product?.discountPrice ? "crimson" : "#acb1b2",
                  textDecoration: product?.discountPrice
                    ? "line-through"
                    : "none",
                  marginLeft: product?.discountPrice ? "20px" : "0px",
                }}
              >
                ₹ {product?.price}
              </Typography>
            </Box>

            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              marginBottom={0}
            >
              In Stock : {product?.inStock}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <Button
            sx={{
              background: "#539165",
              "&:hover": { background: "#539165" },
              color: "#fff",
              margin: "3px 0px",
            }}
            onClick={(e) => handleAddToCart(e, product)}
          >
            Add to cart
          </Button>
          <Button
            sx={{
              background: "#539165",
              "&:hover": { background: "#539165" },
              color: "#fff",
              margin: "3px 0px",
            }}
          >
            Wishlist
          </Button>
        </Box>
      </CardActionArea>
    </Card>
  );
}
