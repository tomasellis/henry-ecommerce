import { PRODUCTS_ACTIONS } from "../actions/products/productActions";

const initialState = {
  product: [],
  options: [],
  favoriteProducts : [],
  productsInCartByUser: [],
  articles: {
    products: [],
    next: [],
  },
  cart: localStorage.cartStorage ? JSON.parse(localStorage.cartStorage) : [],
  idsInCart: localStorage.idsInCartStorage
    ? JSON.parse(localStorage.idsInCartStorage)
    : [],
  searchArticles: [],
  user: {
    id: '',
    email: ''
  },
  theme: ''
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      return {
        ...state,
        articles: {
          products: payload.data.products,
          next: payload.next.products,
        },
      };
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
    case "ADD_TO_CART":
      localStorage.cartStorage = JSON.stringify([...state.cart, payload]);
      localStorage.idsInCartStorage = JSON.stringify([
        ...state.idsInCart,
        payload.id,
      ]);
      return {
        ...state,
        cart: [...state.cart, payload],
        idsInCart: [...state.idsInCart, payload.id],
      };

    case "REMOVE_FROM_CART":
      const cartFiltered = state.cart.filter(
        (product) => product.id_option !== payload
      );
      const idsFiltered = state.idsInCart.filter((id) => id !== payload);
      localStorage.cartStorage = JSON.stringify(cartFiltered);
      localStorage.idsInCartStorage = JSON.stringify(idsFiltered);
      return {
        ...state,
        cart: cartFiltered,
        idsInCart: idsFiltered,
      };

    case "UPDATE_QUANTITY":
      // eslint-disable-next-line
      state.cart.some((product) => {
        if (product.id_option === payload.id_option) {
          product.quantity = payload.quantity;
          return true;
        }
      });
      localStorage.cartStorage = JSON.stringify(state.cart);
      return state;

    case "SEARCH_ARTICLES":
      return {
        ...state,
        searchArticles: payload.fuzzy_search,
      };

    case 'ADD_FAVORITE_PRODUCT' :
      return {
        ...state,
        favoriteProducts : [...state.favoriteProducts, payload]
      }

    case "CLEAN_PRODUCT_DETAIL":
      return {
        ...state,
        product: [],
      };

    case "CLEAN_PRODUCTS":
      return {
        ...state,
        articles: {
          products: [],
          next: [],
        },
      };

    case 'SET_DATA_USER':
      return {
        ...state,
        user: {
          id: payload.user_id,
          email: payload.user_email,
          auth0_id: payload.auth0_id
        }
      }

    case 'SET_PRODUCTS_IDS_IN_CART':
      if (Array.isArray(payload)) {
        return {
          ...state,
          idsInCart: payload
        }
      } else {
        return {
          ...state,
          idsInCart: [...state.idsInCart, payload]
        }
      }
      case 'CHANGE_COLOR':
        return{
          ...state,
          theme: payload
        }

    default:
      return state;
  }
};
