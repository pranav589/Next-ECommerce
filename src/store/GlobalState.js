import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import { createContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    auth: {},
    cart: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (token) {
          const verified = await apiCall("GET", "auth/verify", token);
          dispatch({
            type: "AUTH",
            payload: {
              isVerified: verified?.data?.verification,
              user: verified?.data?.user,
            },
          });
        } else {
          setUser(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        router.push("/login");
      }
    };

    checkLogin();
  }, [token]);
  useEffect(() => {
    if (token && auth?.isVerified) {
      const fetchCart = async () => {
        const res = await apiCall("GET", `cart/${auth?.user?.id}`, token);
        if (res?.data?.status === "success") {
          const totalQuantity = res?.data?.Data?.cart?.[0]?.products?.reduce(
            (acc, curr) => acc + curr?.quantity,
            0
          );
          dispatch({
            type: "CART",
            payload: {
              ...cart,
              length: totalQuantity,
              totalAmount: res?.data?.Data?.totalAmount,
            },
          });
        }
      };
      fetchCart();
    }
  }, [auth?.isVerified]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("__next__cart01__devat", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
