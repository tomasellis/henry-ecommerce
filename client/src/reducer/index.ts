const initialState = {
  product: [],
  options: [],
  productsInCartByUser: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_PRODUCT_INFO":
      return {
        ...state,
        product: payload,
      };
    case "GET_OPTIONS":
      return {
        ...state,
        options: payload,
      };
    default:
      return state;
  }
}
