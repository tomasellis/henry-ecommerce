import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//import css
import "./products.css";

//import actions
import { cleanProducts } from "../../actions";

//import components
import Filter from "./filter/filter";
import Card from "./cards/card";
import Footer from "../Footer/Footer";

export default function Products() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);


  useEffect(() => {
    return () => {
      dispatch(cleanProducts())
    }
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="content-wrap">
      <h1 className="title_ropa_products">Cloth</h1>
      <Filter />
      <div className='ctn_product'>
        {state.products?.map((e, i) => {
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
      <Footer />
    </div>
  );
}
