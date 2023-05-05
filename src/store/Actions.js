import { apiCall } from "@/utils/apiCall";
import { toast } from "react-toastify";

export const ACTIONS = {
  AUTH: "AUTH",
  CART: "CART",
  WISHLIST: "WISHLIST",
};

const token = typeof window !== "undefined" && localStorage.getItem("token");

export const addToCart = (product, cart, length, totalAmount) => {
  return {
    type: "CART",
    payload: { ...cart, length: length, totalAmount: totalAmount },
  };
};
