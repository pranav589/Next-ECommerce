import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import useWindowSize from "@/hooks/useWindowSize";
import { DataContext } from "@/store/GlobalState";
import IncrementDecrementCounter from "../IncrementDecrementCounter/IncrementDecrementCounter";

function CartProduct({
  product,
  setTriggerLoginCart,
  triggerLoginCart,
  setTriggerGuestCart,
  triggerGuestCart,
}) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const cartId =
    typeof window !== "undefined" && localStorage.getItem("cartId");
  const { width } = useWindowSize();
  const truncate = (input, length) =>
    input?.length > length ? `${input.substring(0, length)}...` : input;
  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      if (token && auth?.isVerified) {
        const data = {
          productId: product?.productId?._id,
        };
        const res = await apiCall(
          "DELETE",
          `cart/${auth?.user.id}`,
          token,
          data
        );
        if (res?.data?.status === "success") {
          toast.success("Item deleted from the cart.");
          setTriggerLoginCart(!triggerLoginCart);
        }
      } else {
        const data = {
          productId: product?.productId?._id,
          cartId: cartId,
        };
        if (cartId !== null) {
          const res = await apiCall(
            "DELETE",
            `cart/guest/${cartId}`,
            token,
            data
          );
          if (res?.data?.status === "success") {
            toast.success("Item deleted from the cart.");
            setTriggerGuestCart(!triggerGuestCart);
          }
        }
      }

      setIsDeleteLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsDeleteLoading(false);
    }
  };

  const handleDecrease = async () => {
    setIsLoading(true);
    try {
      if (token && auth?.isVerified) {
        const data = [
          {
            productId: product?.productId?._id,
            quantity: 1,
          },
        ];

        const res = await apiCall(
          "PATCH",
          `cart/${auth?.user?.id}`,
          token,
          data
        );
        if (res?.data?.status === "success") {
          toast.success("success");
          setTriggerLoginCart(!triggerLoginCart);
        }
      } else {
        const data = {
          products: [
            {
              productId: product?.productId?._id,
              quantity: 1,
            },
          ],
          cartId: cartId,
        };
        if (cartId !== null) {
          const res = await apiCall(
            "PATCH",
            `cart/guest/${cartId}`,
            token,
            data
          );
          if (res?.data?.status === "success") {
            toast.success("success");
            setTriggerGuestCart(!triggerGuestCart);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLoading(false);
    }
  };

  const handleIncrease = async () => {
    setIsLoading(true);
    try {
      if (token && auth?.isVerified) {
        const data = [
          {
            productId: product?.productId?._id,
            quantity: 1,
          },
        ];
        if (product?.productId?.inStock <= product?.quantity) {
          return toast.error("Item is out of stock");
        }
        const res = await apiCall(
          "POST",
          `cart/${auth?.user?.id}`,
          token,
          data
        );
        if (res?.data?.status === "success") {
          toast.success("success");
          setTriggerLoginCart(!triggerLoginCart);
        }
      } else {
        const cartId =
          typeof window !== "undefined" ? localStorage.getItem("cartId") : "";
        const data = {
          cartId: cartId,
          products: [
            {
              productId: product?.productId?._id,
              quantity: 1,
            },
          ],
        };
        const res = await apiCall("POST", `cart`, "", data);

        if (res?.data?.status === "success") {
          toast.success("success");
          localStorage.setItem("cartId", res?.data?.Data?._id);
          setTriggerGuestCart(!triggerGuestCart);
        }
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: "0%", sm: "0px 5%" },
      }}
    >
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            marginRight: "25px",
          }}
        >
          <img
            src={product?.productId?.images?.[0]?.url}
            style={{ height: "100%", width: "100%" }}
            alt={product?.productId?.title}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            {width < 700
              ? truncate(product?.productId?.title, 10)
              : product?.productId?.title}
          </Typography>
          <Box sx={{ display: "flex" }}>
            {product?.productId?.discountPrice && (
              <Typography variant="body1">
                Rs. {product?.productId?.discountPrice * product?.quantity}
              </Typography>
            )}
            <Typography
              variant="body1"
              sx={{
                marginLeft: "15px",
                textDecoration: product?.productId?.discountPrice
                  ? "line-through"
                  : "none",
                color: product?.productId?.discountPrice ? "crimson" : "#000",
              }}
            >
              Rs. {product?.productId?.price * product?.quantity}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            marginRight: { xs: "10px", sm: "25px" },
            marginLeft: {
              xs: "10px",
              md: "",
            },
          }}
        >
          <IncrementDecrementCounter
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            product={product}
            isLoading={isLoading}
          />
        </Box>

        {isDeleteLoading ? (
          <CircularProgress
            sx={{
              color: "#539165",
            }}
            size={25}
          />
        ) : (
          <Button
            sx={{
              border: "1px solid red",
              marginRight: "10px",
              padding: "3px",
              minWidth: "fit-content",
            }}
            onClick={() => handleDelete(product)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default CartProduct;
