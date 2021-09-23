import "./DetailProductCard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import './FormReview.css'
import { BiMessageAdd } from "react-icons/bi";
import { MdRateReview } from "react-icons/md";
import { IconButton } from "@material-ui/core";
import { useAlert } from 'react-alert'
import { useAuth0 } from "@auth0/auth0-react";

const { REACT_APP_BASE_BACKEND_URL } = process.env;


interface Review {
  id_product_general: string,
  stars: number,
  comment: string,
  user_email: string,
  user_id: string
}

interface Errors {
  stars: string,
  comment: string
}


type User = {
  id: string,
  email: string,
  productsReceived:string[],
  reviews:string[]

}

interface RootState {
  user: User
}

export const FormReview = ({
  product_id
}: {
  product_id: string
}) => {
  const alertReact = useAlert()
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth0();
  const state = useSelector((state: RootState) => state);
  const [review, setReview] = useState({
    stars: null,
    comment: ''
  })
  const [errors, setErrors] = useState({
    stars: '',
    comment: ''
  })

  function handleChange(e) {
    setReview((review) => ({
      ...review,
      [e.target.name]: e.target.value
    }))
    setErrors(validate({
      ...review,
      [e.target.name]: e.target.value
    }));
  }



  function validate(review) {
    let errors: Errors = { stars: '', comment: '' };
    if (!review.stars) {
      errors.stars = 'Rating is required';
    }
    if (!review.comment) {
      errors.comment = 'Comment id required';
    }
    return errors;
  };

  async function handleSubmit(e) {
    e.preventDefault()
    const body: Review = {
      id_product_general: product_id,
      user_id: state.user.id,
      stars: review.stars,
      comment: review.comment,
      user_email: state.user.email
    }

    if (errors.comment || errors.stars) return alertReact.error('check required fields')
    const { data } = await axios.post(`${REACT_APP_BASE_BACKEND_URL}/addReview`, body)
    if (data.insert_reviews_one) {
      dispatch({type: 'UPDATED_REVIEWS', payload:product_id})
      return alertReact.success('review added')
    }
    alertReact.success(data)

  }


  useEffect(() => {
    setReview({
      stars: null,
      comment: ''
    })
    return () => {

    };
    // eslint-disable-next-line
  }, [state.user.reviews]);



  return (isAuthenticated && state.user.productsReceived.includes(product_id) && !state.user.reviews.includes(product_id))? (
    <React.Fragment>
      
      <div className="boxFormReview" style={{ textAlign: 'center' }}>
        <h4> Add Review <MdRateReview /> </h4>
      </div>

      <form className='form-review' onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="stars" className="control-label">
            Rating
          </label>
          <div className={errors.stars ? 'has-error stars' : "stars"}>
            <input id="radio5" type="radio" name="stars" value="5" onChange={handleChange} />
            <label id='estrellas' htmlFor="radio5">★</label>
            <input id="radio4" type="radio" name="stars" value="4" onChange={handleChange} />
            <label id='estrellas' htmlFor="radio4">★</label>
            <input id="radio3" type="radio" name="stars" value="3" onChange={handleChange} />
            <label id='estrellas' htmlFor="radio3">★</label>
            <input id="radio2" type="radio" name="stars" value="2" onChange={handleChange} />
            <label id='estrellas' htmlFor="radio2">★</label>
            <input id="radio1" type="radio" name="stars" value="1" onChange={handleChange} />
            <label id='estrellas' htmlFor="radio1">★</label>
          </div>
        </div>
        <p className="has-error">{errors.stars}</p>

        <div className="input-comment">


          <textarea
            placeholder='Your comment'
            onChange={handleChange}
            name="comment"
            className={errors.comment ? 'has-error form-control' : 'form-control'}
            required
            maxLength={200}
          />
        </div>
        <p className="has-error">{errors.comment}</p>


        <div className='btn-review'>
          <IconButton type='submit'>
            <BiMessageAdd size={40} color={'#000'} />
          </IconButton>

        </div>
      </form>
    </React.Fragment>
  ) : null;
};

export default FormReview