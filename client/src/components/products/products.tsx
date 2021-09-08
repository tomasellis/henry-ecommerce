import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//import css
import "./products.css";

//import actions
import { getArticles } from "../../actions/products/productActions";

//import components
import Filter from "./filter/filter";
import Card from "./cards/card";
import Pagination from './Pagination/Pagination';

export default function Products() {

    const dispatch = useDispatch();
    const articles = useSelector((state : any) => state.articles);
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [articlesPerPage]= useState<number>(8);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle,indexOfLastArticle);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    type GenderParams = {
        gender : string
    };

    const {gender} = useParams<GenderParams>();

    useEffect(() => {
            dispatch(getArticles(gender,  undefined, undefined, undefined,  undefined, undefined))
    }, [dispatch,gender])

    return(
        <div>
            <h1 className = 'title_ropa_products'>Ropa</h1>
            <Filter/>
            <div>
            {
                currentArticles?.map((e,i) => {
                    return (
                        <Card key={e.id}
                        id = {e.id}
                        image = {e.image_url}
                        name={e.name}
                        price={e.price}
                        />
                    )
                })
            }
            </div>
            <Pagination
            articlesPerPage={articlesPerPage}
            articlesLength={articles.length}
            paginate={paginate}
            currentPage={currentPage}
            />
    </div>
  );
}
