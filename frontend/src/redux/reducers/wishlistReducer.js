import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/wishlistActions";

const initialState = {
  products: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const updatedProducts = [...state.products, action.payload];
      return {
        ...state,
        products: updatedProducts,
      };
    case REMOVE_FROM_WISHLIST:
      const filteredProducts = state.products.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        products: filteredProducts,
      };

    default:
      return state;
  }
};

export default wishlistReducer;
