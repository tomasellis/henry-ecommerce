import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { search, maxProducts } = request.query;

    const search_query: string = (search as string) ?? "";
    const maxProducts_query: number =
      maxProducts !== undefined ? parseInt(maxProducts as string) : 5;

    console.log(search_query, "search", maxProducts_query);
    if (
      search_query !== "" &&
      maxProducts_query !== NaN &&
      maxProducts_query >= 1
    ) {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: fuzzySearchQuery(search_query, maxProducts_query),
          },
        });
        if (data.errors) {
          return response.status(400).send(data);
        }
        const res = {
          ...data,
          msg: "Fuzzy search done! You can ask for a certain quantity of products with the query maxProducts",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
    } else {
      if (maxProducts_query < 1) {
        return response.send(
          `Missing: ${
            search_query !== ""
              ? ""
              : "search_query(string) or maxQuantity >= 1"
          }`
        );
      } else {
        return response.send(
          `Missing: ${search_query !== "" ? "" : "search(string)"}`
        );
      }
    }
  }
);

export default router;

const fuzzySearchQuery = (
  search_query: string,
  maxProducts_query: number
) => `query fuzzySearch{
    fuzzy_search(args:{search:"${search_query}", maxproducts:${maxProducts_query}}) {
      id
      name
      image_url
      gender
    }
  }`;
