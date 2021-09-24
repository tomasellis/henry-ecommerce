import { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/* import { useEffect } from "react" */
import StarIcon from '@material-ui/icons/Star';


//import actions
import { getFavorites } from "../../../actions";
import { deleteFavProduct } from "../../../actions";
/* import { getProduct } from "../../../actions"; */

//import css
import './Favorites.css'

//import component
import Profile from "../Profile";

export default function Favorites() {

    /* const dispatch = useDispatch(); */
    const user_id = useSelector((state: any) => state.user);
    const id_user = user_id.id
    let favProducts = useSelector((state: any) => state.favoriteProducts);
    let productsFavs = favProducts?.products?.users_by_pk?.favourites;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFavorites(id_user))
        // eslint-disable-next-line
    }, [productsFavs]);


    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';

    const handleDeletle = (e) => {

        productsFavs?.filter(i => {
            return i.id !== e.id
        });
        console.log(productsFavs);


        dispatch(deleteFavProduct({ favorite_id: e.id }));
    }

    return (
        <>
            <div className='divqencierratodo'>
                <Profile />
                <div className='div_fav_products'>
                    {productsFavs?.length < 1 ? <h4 className='h1_vacio_fav'>Add products to your favorites...</h4> : productsFavs?.map(e => {
                        return (
                            <div className='cards_container_products_fav'>
                                <div className='div_container_card_product_fav'>
                                    <div className='div_card_product_fav'>
                                        <Link to={`/clothing/details/${e.product_id}`}>
                                            <img className='img_product_fav' src={e.product.image_url.includes('http') ? e.product.image_url : IMG} alt="" />
                                            <h3 className='card_name_product_fav'>{e.product.name}</h3>
                                            <h5 className='card_desc_product_fav'><b>{e.product.price}</b></h5>
                                        </Link>
                                        <button
                                            onClick={() => handleDeletle(e)}
                                            className='button_fav_product_fav'
                                        ><IconButton>
                                                <StarIcon className='icon_fav_in' />
                                            </IconButton>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
};