import { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//import action
import { getProduct } from '../../actions/index';

//import component
import { DetailsProductCard } from "./DetailProductCard";

export const DetailProductCards = () => {

    const dispatch = useDispatch();
    type IDParams = {
        id : string
    };
    const {id} = useParams<IDParams>();
    const product = useSelector((state : any) => state.product);
    
    
    useEffect(() => {
        dispatch(getProduct(id))
    }, [id,dispatch])
    console.log(product)
    

    return ( product.length || product.products?.length ?
       <DetailsProductCard 
            id = {id}
            name = {product?.products[0]?.name}
            image_url = {product.products[0].image_url}
            price = {product?.products[0]?.price}
            id_option = {product?.products[0]?.product_options[0].id}
            color = {product?.products[0]?.product_options[0].color}
            size = {product?.products[0]?.product_options[0].size}
            stock = {product?.products[0]?.product_options[0].stock}
       />
       :
       <div>Loading</div>
    )
}
