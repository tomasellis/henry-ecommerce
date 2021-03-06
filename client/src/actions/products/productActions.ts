import axios from "axios";
import { cartIsLoading } from "..";

export const PRODUCTS_ACTIONS = {
  BRING_CLOTHER: "BRING_CLOTHER",
};

const URL = process.env.REACT_APP_BASE_BACKEND_URL || "http://localhost:4000";
export const getArticles =
  (
    gender: any,
    category_name: any,
    less_than: any,
    greater_than: any,
    color: any,
    size: any,
    page: any,
    limit: any,
    search: any
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(cartIsLoading(true));
      let res = await axios.get(
        `${URL}/products?gender=${gender || ""}&category_name=${
          category_name || ""
        }&less_than=${less_than || ""}&greater_than=${
          greater_than || ""
        }&color=${color || ""}&size=${size || ""}&_page=${page || ""}&_limit=${
          limit || ""
        }&_search=${search || ""}`
      );
      dispatch({
        type: PRODUCTS_ACTIONS.BRING_CLOTHER,
        payload: res.data,
      });
      dispatch(cartIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
