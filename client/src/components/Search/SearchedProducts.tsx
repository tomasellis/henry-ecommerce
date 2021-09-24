import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { getArticles } from "../../actions/products/productActions";
import { getFavorites } from "../../actions";

import Card from "../products/cards/card";

export default function SearchedProducts() {

  const dispatch = useDispatch();
  const { search } = useLocation()
  const value = queryString.parse(search)
  const state = useSelector((state: any) => state);
    const user_fav =  state.user
  const favIcon =  state.favoriteProducts

  useEffect(() => {
    dispatch(getFavorites(user_fav.id))
  }, [])

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
}, []);
  
  return (
    <div>
    <h1 className="title_ropa_products">Cloth</h1>
    <div>
      {state.products?.map((e, i) => {
         let cond = false;
         favIcon?.products?.users_by_pk?.favourites?.map(e => {
           if(e.product_id === e.id) cond = true;
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
      })}
    </div>
    </div>
  );
}
