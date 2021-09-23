import { PRODUCTS_ACTIONS } from "../actions/products/productActions";

const initialState = {
  products: [],
  maxProducts: 0,
  product: [],
  options: [],
  favoriteProducts: [],
  productsInCartByUser: [],

  cart: localStorage.cartStorage ? JSON.parse(localStorage.cartStorage) : [],
  idsInCart: localStorage.idsInCartStorage
    ? JSON.parse(localStorage.idsInCartStorage)
    : [],
  searchArticles: [],
  user: {
    id: '',
    email: '',
    productsReceived: [],
    reviews: []
  },
  storeHistory: []
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      return {
        ...state,
        products: payload.data.products,
        maxProducts: payload.data.products_aggregate.aggregate.count
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

    case 'ADD_FAVORITE_PRODUCT':
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, payload]
      }

    case "CLEAN_PRODUCT_DETAIL":
      return {
        ...state,
        product: [],
      };

    case "CLEAN_PRODUCTS":
      return {
        ...state,
        products: payload,
        maxProducts: 0
      }

    case 'SET_DATA_USER':
      let ordersReceived = [], ordersShipped = [], ordersApproved = [], productsReceived = []
      let reviews = payload.reviews.map(review => review.id_product_general)
      let orders = payload.orders.map(order => {
        switch (order.status.toLowerCase()) {
          case 'approved':
            ordersApproved.push(order.orders_products)
            break;
          case 'shipped':
            ordersShipped.push(order.orders_products)
            break;
          case 'delivered':
            ordersReceived.push(order.orders_products)
            order.orders_products.map(product => {
              return productsReceived.push(product.product_id)
            })
            break;
        }
        return order.orders_products
      })
      return {
        ...state,
        user: { ...payload, orders: orders, reviews: reviews, ordersReceived, ordersShipped, ordersApproved, productsReceived }
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
      
    case 'UPDATED_REVIEWS':
      return {
        ...state,
        user: { ...state.user, reviews: [...state.user.reviews, payload] }
      }

    case "SET_STORE_HISTORY":
      return {
        ...state,
        storeHistory: payload
      }

    default:
      return state;
  }
};
