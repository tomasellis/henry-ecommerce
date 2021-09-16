import "./DetailProductCard.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { cleanProductDetail } from "../../actions";

interface Review {
  stars: number,
  comment: string,
  user_email: string
}

type Reviews ={
  reviews: Review[]
}

export const DetailProductReview = ({
  product_id
}: { 
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

  



  return (
    <div className="boxReview" style={{textAlign:'center'}}>
      {reviews.map((review: Review) => {

        return (<div key={review.user_email}>
          <h3>{review.user_email}</h3>
          <h4>stars: {review.stars}</h4>
          <h4>{review.comment}</h4>
        </div>)
      })}

    </div>
  );
};

export default DetailProductReview