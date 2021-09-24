import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';

import { getFavorites } from "../../actions";
import  { searchProducts } from "../../actions/searchArticles/searchArticles";

import Card from "../products/cards/card";
import Footer from "../Footer/Footer";

export default function SearchedProducts() {

  const dispatch = useDispatch();
  const { search } = useLocation()
  const value = queryString.parse(search)
  const state = useSelector((state: any) => state);
  const user_fav =  state.user
  const favIcon =  state.favoriteProducts

  useEffect(() => {
    dispatch(
      searchProducts(word)
    )
    dispatch(getFavorites(user_fav.id))
    // eslint-disable-next-line
  }, []);

  const word : string = value.word.toString()

  return (
<div className="page-container">
  <div className="content-wrap">
    <h1 className="title_ropa_products">Cloth</h1>
    <div>
      {state.products.length>0 ? state.products?.map((e, i) => {
         let cond = false;
         favIcon?.products?.users_by_pk?.favourites?.map(e => {
           if(e.product_id === e.id) cond = true;
           return true
         })
        return (
          <Card
            product_id={e.id}
            key={e.id}
            id={e.id}
            image={e.image_url}
            name={e.name}
            price={e.price}
            cond={cond}
          />
        );
      }):  <div>{`You searched for ${word}. Your search has no matches. Please, try another keyword.`}</div>}
      </div>
      </div>
      <Footer />
    </div>
  );
}
