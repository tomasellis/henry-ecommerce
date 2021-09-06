import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//import css
import './products.css'

//import actions
import { getArticles } from "../../actions/products/productActions";

//import components
import Filter from "./filter/filter";
import Card from "./cards/card";

export default function Products(){

    const dispatch = useDispatch();
    const articles = useSelector((state : any) => state.articles);

    type GenderParams = {
        gender : string
    };
    const {gender} = useParams<GenderParams>();

    function Genero(){
        useEffect(function(){
        dispatch(getArticles('hombre', undefined, undefined, undefined, undefined, undefined))});
        console.log(articles);
    }

    return(
        <div>
            {gender === 'men' ? Genero(): null}
            {gender === 'woman' ? <p>soy mujer</p> : null}
            {gender === 'kids' ? <p>soy niño</p> : null}
            <h1 className = 'ropa_title_prdouct'>Ropa</h1>
            <Filter/>
            {
                articles.map(e => {
                    return (
                        <Card
                        name = {e.name}
                        price = {e.price}
                        />
                    )
                })
            }
    </div>
    )   
};