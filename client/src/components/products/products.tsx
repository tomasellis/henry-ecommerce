import { useParams } from "react-router";

//import css
import './products.css'

//import components
import Filter from "./filter/filter";
import Crads from "./cards/cards";

export default function Products(){

    type GenderParams = {
        gender : string
    };
    const {gender} = useParams<GenderParams>();
    
    return(
        <div>
            <h1 className = 'ropa_title_prdouct'>Ropa</h1>
            <Filter/>
            <Crads/>
            {gender === 'men' ? <p>soy hombre</p> : null}
            {gender === 'woman' ? <p>soy mujer</p> : null}
            {gender === 'kids' ? <p>soy niño</p> : null}
    </div>
    )   
};