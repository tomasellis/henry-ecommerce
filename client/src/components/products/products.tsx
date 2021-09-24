import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//import css
import "./products.css";

//import actions
import { cleanProducts, getFavorites } from "../../actions";

//import components
import Filter from "./filter/filter";
import Card from "./cards/card";
import Footer from "../Footer/Footer";

export default function Products() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const user_fav = useSelector((state: any) => state.user);
  const favIcon = state.favoriteProducts;

  useEffect(() => {
    return () => {
      dispatch(cleanProducts());
    };
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFavorites(user_fav.id));
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className="title_ropa_products">Clothes</h1>
        <Filter />
        <div className="ctn_product">
          {state.loadingCart === false ? (
            state.products?.map((e) => {
              let cond = false;
              favIcon?.products?.users_by_pk?.favourites?.map((i) => {
                if (e.id === i.product_id) cond = true;
                return true;
              });
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
            })
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: "25px",
                paddingTop: "30px",
                justifyContent: "center",
                alignContent: "center",
                height: "60vh",
              }}
            >
              <span>Loading products...</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
