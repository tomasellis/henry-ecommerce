import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

type CategoriesFromDB = {
  name: string;
};

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { categories } = request.body;

    if (categories !== undefined) {
      const categoriesStringArray: string[] = (
        categories as CategoriesFromDB[]
      ).map((category_name) => {
        const string = `{ name: ${category_name.name} }`;
        return string;
      });

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: addNewCategoriesMutation(categoriesStringArray),
          },
        });

        console.log(addNewCategoriesMutation(categoriesStringArray));

        if (data.errors) {
          if (
            (data.errors[0].message as string).includes("Uniqueness violation")
          ) {
            return response.status(400).send({ msg: "Its already added!" });
          }
          return response.status(400).send(data);
        }
        const res = {
          ...data,
          msg: "Categories created!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
    } else {
      response.send(
        `Missing: {${
          categories !== undefined
            ? ""
            : "categories([{name:'categoryName'}])}  an array with {name:''} "
        }}`
      );
    }
  }
);

export default router;

const addNewCategoriesMutation = (categories_query: string[]) => `mutation{
	insert_categories(objects:[${categories_query}]){
    affected_rows
    returning{
      name
    }
  }
}`;
