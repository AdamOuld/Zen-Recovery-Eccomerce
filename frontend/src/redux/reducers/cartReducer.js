import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/cartActions";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.items.find((item) => item.id === action.payload.item.id)) {
        const updatedItems = state.items.map((item) => {
          if (item.id === action.payload.item.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });
        const updatedTotalPrice = parseFloat(
          (
            state.totalPrice +
            action.payload.item.price * action.payload.quantity
          ).toFixed(2)
        );
        const updatedTotalQuantity =
          state.totalQuantity + action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
      const updatedTotalPrice = parseFloat(
        (
          state.totalPrice +
          action.payload.item.price * action.payload.quantity
        ).toFixed(2)
      );
      const updatedTotalQuantity =
        state.totalQuantity + action.payload.quantity;
      return {
        ...state,
        items: state.items.concat({
          ...action.payload.item,
          quantity: action.payload.quantity,
        }),
        totalQuantity: updatedTotalQuantity,
        totalPrice: updatedTotalPrice,
      };

    case REMOVE_FROM_CART:
      if (
        state.items.find((item) => item.id === action.payload).quantity === 1
      ) {
        const updatedItems = state.items.filter(
          (item) => item.id !== action.payload
        );
        const updatedTotalPrice = parseFloat(
          (
            state.totalPrice -
            state.items.find((item) => item.id === action.payload).price
          ).toFixed(2)
        );
        const updatedTotalQuantity = state.totalQuantity - 1;
        return {
          ...state,
          items: updatedItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      } else {
        const updatedItems = state.items.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });

        const updatedTotalPrice = parseFloat(
          (
            state.totalPrice -
            state.items.find((item) => item.id === action.payload).price
          ).toFixed(2)
        );
        const updatedTotalQuantity = state.totalQuantity - 1;
        return {
          ...state,
          items: updatedItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
