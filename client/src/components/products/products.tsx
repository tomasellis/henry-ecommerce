import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//import css
import "./products.css";

//import actions
import { getArticles } from "../../actions/products/productActions";

//import components
import Filter from "./filter/filter";
import Card from "./cards/card";

export default function Products() {

    const dispatch = useDispatch();
    const articles = useSelector((state : any) => state.articles);

    type GenderParams = {
        gender : string
    };
    const {gender} = useParams<GenderParams>();
    console.log(gender);
    
    
    useEffect(() => {
            dispatch(getArticles(gender,  undefined, undefined, undefined,  undefined, undefined))
    }, [dispatch,gender]) 
    
    return(
        <div>
            <h1 className = 'title_ropa_products'>CLOTHES</h1>
            <Filter/> 
            {
                articles?.map((e,i) => {
                    return (
                        <Card key={e.id}
                        id = {e.id}
                        image = {e.image_url}
                        name={e.name}
                        price={e.price}
                        />
                    )
                })
            }
    </div>
  );
}
