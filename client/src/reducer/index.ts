const initialState = {
  product : [],
  options: [],
  productsInCartByUser:[]
}

export default function rootReducer(state = initialState, {type, payload}) {
  switch(type){
    case "GET_PRODUCT_INFO":
      return {
        ...state,
        product:payload
      }
    case "GET_OPTIONS":
      return {
        ...state,
        options:payload
      }
      case "GET_PRODUCTS_IN_CART_by_USER":
        return {
          ...state,
          productsInCartByUser:payload
        }
    default:
      return state
  }
}
