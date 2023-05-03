import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.CART:
      return {
        ...state,
        cart: action.payload,
      };
  }
};

export default reducers;
