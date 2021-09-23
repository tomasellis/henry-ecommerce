import "./DetailProductCard.css";
import React from 'react'
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components"
import StarIcon from '@material-ui/icons/Star';
import FormReview from "./FormReview";

interface Review {
  stars: number,
  comment: string,
  user_email: string,
  user_name: string,
}

type Reviews = {
  reviews: Review[]
}

type User = {
  id: string;
  email: string;
  auth0_id: string;
  role:string;
  productsReceived:string[],
  reviews:string[]
};

interface RootState {
  idsInCart: string;
  user: User;
  updatedReviews:boolean;
}

export const DetailProductReview = ({
  product_id
}: {
  product_id: string
}) => {
  const state = useSelector((state: RootState) => state);
  const [reviews, setReviews] = useState([])



  const getReviews = async () => {
    const { data }: AxiosResponse<Reviews> = await axios.get(`${process.env.REACT_APP_BASE_REST_API_HASURA}/getReviewsProduct/${product_id}`)
    setReviews(data.reviews)
  }


  useEffect(() => {
    getReviews()
    return () => {
     
    };
    // eslint-disable-next-line
  }, [state.user.reviews]);





  return (
    <React.Fragment>
      <FormReview product_id={product_id} />
      <BoxReview>
        {reviews.map((review: Review) => {
          let stars = []
          const starPush = () => {
            for (let i = 0; i < review.stars; i++) {
              stars.push(<StarIcon style={{ color: 'gold' }} />)
            }
          }
          starPush()

          let userName = review.user_email.slice(0, 4)

          return (
            <div key={review.user_email} className='post-comment'>
              <div className="header">
                <h6>{userName}...@mail.com</h6>
                <h6>{stars}</h6>
              </div>
              <div className='comment'>
                <p>{review.comment}</p>
                <hr />
              </div>
            </div>
          )
        })}

      </BoxReview>
    </React.Fragment>
  );
};

export default DetailProductReview

const BoxReview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255,255,255,0.5);
  max-width: 400px;
  margin: 50px auto;
  padding: 5px;
  

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    h6{
    font-weight: 600;
    margin: 5px;
  }
  }

  .post-comment{
    margin-left: 5px;
    margin-right: 5px;
  }
  .comment{
    font-weight: 100;
  }
`