import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";

import { getProduct } from "../../../actions/index";

export default function ModifyProduct() {
  const dispatch = useDispatch();
  type IDParams = {
    id: string;
  };
  const { id } = useParams<IDParams>();
  const product = useSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  console.log(product)
  return (<div>Hello</div>)

}
