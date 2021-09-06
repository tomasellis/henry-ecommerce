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

    
    useEffect(() => {
        if(gender === 'men'){
            dispatch(getArticles('hombre',  undefined, undefined, undefined,  undefined, undefined))
        };
        if(gender === 'woman'){
            dispatch(getArticles('mujer',  undefined, undefined, undefined,  undefined, undefined))
        };
        if(gender === 'kids'){
            dispatch(getArticles('niños',  undefined, undefined, undefined,  undefined, undefined))
        };
    }, [dispatch,gender]) 
    
    return(
        <div>
            <h1 className = 'title_ropa_products'>Ropa</h1>
            <Filter/>
            {
                articles?.map(e => {
                    console.log(e);
                    
                    return (
                        <Card
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
