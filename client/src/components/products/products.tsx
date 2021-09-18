import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//import css
import "./products.css";

//import actions
import { getArticles } from "../../actions/products/productActions";
import { cleanProducts } from "../../actions";

//import components
import Filter from "./filter/filter";
import Card from "./cards/card";
import Pagination from "./Pagination/Pagination";
import Footer from "../Footer/Footer";

export default function Products() {
  const dispatch = useDispatch();
  const articles = useSelector((state: any) => state.articles);
  const [limit] = useState<number>(12);

  type Params = {
    gender: string;
    page: string;
  };

  const { gender } = useParams<Params>();
  const { page } = useParams<Params>();
  console.log(typeof(page))
  useEffect(() => {
    dispatch(
      getArticles(
        gender,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        page,
        limit,
        undefined
      )
    );
    return () => {
      dispatch(cleanProducts())
    }
  }, [dispatch, gender, page, limit]);

  return (
    <div className="page-container">
      <div className="content-wrap">
      <h1 className="title_ropa_products">Cloth</h1>
      <Filter />
      <div className = "flex">
        {articles.products?.map((e, i) => {
          return (
            <Card
              key={e.id}
              id={e.id}
              image={e.image_url}
              name={e.name}
              price={e.price}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={page}
        nextLength={articles.next.length}
        gender={gender}
      />
      </div>
      <Footer />
    </div>
  );
}
