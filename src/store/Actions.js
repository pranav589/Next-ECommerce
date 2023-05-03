import { apiCall } from "@/utils/apiCall";
import { toast } from "react-toastify";

export const ACTIONS = {
  AUTH: "AUTH",
  CART: "CART",
};

const token = typeof window !== "undefined" && localStorage.getItem("token");

export const addToCart = (product, cart, length, totalAmount) => {
  return {
    type: "CART",
    payload: { ...cart, length: length, totalAmount: totalAmount },
  };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return { type: "CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return { type: "CART", payload: newData };
};

export const deleteItem = (product, cart, type) => {
  const newData = cart.filter((item) => item._id !== product._id);
  return { type, payload: newData };
};

export const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};
