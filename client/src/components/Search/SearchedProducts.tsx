import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { getArticles } from "../../actions/products/productActions";

import Card from "../products/cards/card";

export default function SearchedProducts() {

  const dispatch = useDispatch();
  const { search } = useLocation()
  const value = queryString.parse(search)
  const articles = useSelector((state: any) => state.articles);

  useEffect(() => {
    dispatch(
      getArticles(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      30,
      value.name
    )
  )
}, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
    <h1 className="title_ropa_products">Cloth</h1>
    <div>
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
    </div>
  );
}
