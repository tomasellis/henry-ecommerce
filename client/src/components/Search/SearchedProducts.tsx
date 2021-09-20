import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import  { searchProducts } from "../../actions/searchArticles/searchArticles";

import Card from "../products/cards/card";
import Footer from "../Footer/Footer";

export default function SearchedProducts() {

  const dispatch = useDispatch();
  const { search } = useLocation()
  const value = queryString.parse(search)
  const articles = useSelector((state: any) => state.articles);
  const word : string= value.word.toString()

  useEffect(() => {
    dispatch(
      searchProducts(word)
  )
}, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className="title_ropa_products">Cloth</h1>
         <div>
           {articles.products.length>0 ? articles.products?.map((e, i) => {
             return (
             <Card
               key={e.id}
               id={e.id}
               image={e.image_url}
               name={e.name}
               price={e.price}
             />
             );
          }) : <div>You searched for "{word}". Your search has no matches. Please, try another keyword.</div>}
       </div>
    </div>
    <Footer />
  </div>
  );
}
