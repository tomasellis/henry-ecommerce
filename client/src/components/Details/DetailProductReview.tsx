// import React from "react";
import "./DetailProductCard.css";
// import { useCookies } from 'react-cookie';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { cleanProductDetail } from "../../actions";

type Product = {
  id_option: string;
  id: string;
  name: string;
  image_url: string;
  price: number;
  stock: number;
  color: string;
  size: string;
  quantity;
}

interface Review {
  stars: number,
  comment: string,
  user_email: string
}

type Reviews ={
  reviews: Review[]
}

interface RootState {
  cart: Array<Product>;
  idsInCart: string;
}

export const DetailProductReview = ({
  // user_id,
  product_id
}: { 
  // user_id: string, 
  product_id: string 
}) => {

  const dispatch = useDispatch();
  // const state = useSelector((state: RootState) => state);
  const [reviews, setReviews] = useState([])


  const getReviews = async () => {
    const { data }: AxiosResponse<Reviews> = await axios.get(`${process.env.REACT_APP_BASE_REST_API_HASURA}/getReviewsProduct/${product_id}`)
    setReviews(data.reviews)
  }


  useEffect(() => {
    getReviews()
    return () => {
      dispatch(cleanProductDetail());
    };
    // eslint-disable-next-line
  }, []);

  // const { user, isAuthenticated } = useAuth0();



  return (
    <div className="boxReview" style={{textAlign:'center'}}>
      {reviews.map((review: Review) => {

        return (<div>
          <h3>{review.user_email}</h3>
          <h4>stars: {review.stars}</h4>
          <h4>{review.comment}</h4>
        </div>)
      })}

    </div>
  );
};

