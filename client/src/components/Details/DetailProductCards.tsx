import { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//import action
import { getProduct } from '../../actions/index';

//import component
import { DetailsProductCard } from "./DetailPrpductCard";

export const DetailProductCards = () => {

    const dispatch = useDispatch();
    type IDParams = {
        id : string
    };
    const {id} = useParams<IDParams>();
    const product = useSelector((state : any) => state.articles);

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch])
    

    return (
       <DetailsProductCard 
            id = {id}
            name = {product?.products[0]?.name}
            image_url = {product?.products[0]?.image_url}
            price = {product?.products[0]?.price}
            gender = {product?.products[0]?.gender}
            category = {product?.products[0]?.category}
       />
    )
}
