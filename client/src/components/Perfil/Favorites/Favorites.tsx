/* import { useEffect } from "react" */
import { useSelector } from "react-redux"

//import actions
/* import { getProduct } from "../../../actions"; */

//import component
import Card from "../../products/cards/card";

export default function Favorites( ){
    
    /* const dispatch = useDispatch(); */
    const favProducts = useSelector((state : any) => state.favoriteProducts);
    

    return(
        <> 
            <div className = 'div_fav_products'>
            {
                favProducts?.map((e,index) => {
                    return(
                        <div className = 'mama' key={index}>

                            <Card 
                            name = {e.name}
                            price = {e.price}
                            image = {e.image}
                            id = {e.id}
                            />
                            </div>
                            )
                        })
                    }
            </div>

        </>
    )
};