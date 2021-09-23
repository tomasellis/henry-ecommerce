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
    productsReceived:[]
  }
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
    /*
    orders_products": [
        {
          "product_option_id": "4cdb68ce-7d52-48c1-9742-c98612512f25",
          "quantity": 1,
          "unit_price": 2200,
          "product_id": "6a01061d-bedc-424f-a614-8131f02d40bf"
        },
        {
          "product_option_id": "f9509c9b-8b49-40f0-8f5c-399f52aac226",
          "quantity": 1,
          "unit_price": 1600,
          "product_id": "96fc4357-5384-4062-9213-016ec3353684"
        },
        {
          "product_option_id": "6f29811c-72dd-48ec-aaad-f74c37998fba",
          "quantity": 1,
          "unit_price": 200,
          "product_id": "12882669-5ecf-4c1c-97f4-fcf82ea707f3"
        },
        {
          "product_option_id": "71f73def-7b05-43ee-8832-a4f449ff0254",
          "quantity": 1,
          "unit_price": 54.95,
          "product_id": "75443730-b717-4182-a6e8-cf983b677986"
        },
        {
          "product_option_id": "d723a0ab-0c0e-4386-96ab-ab6b02918762",
          "quantity": 1,
          "unit_price": 34,
          "product_id": "18e68d1d-e877-4eee-80f6-b55bd217e127"
        }
      ],
      "status": "approved"
    },
    {
      "orders_products": [
        {
          "product_option_id": "4cdb68ce-7d52-48c1-9742-c98612512f25",
          "quantity": 2,
          "unit_price": 2200,
          "product_id": "6a01061d-bedc-424f-a614-8131f02d40bf"
        }
      ],
      "status": "approved"
    }
  ],
     */

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
        user: { ...payload, orders:orders,reviews:reviews, ordersReceived,ordersShipped,ordersApproved,productsReceived }
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

    default:
      return state;
  }
};
