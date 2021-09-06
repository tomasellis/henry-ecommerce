import { Link } from "react-router-dom";

//import css
import "./categorySlide.css";

//import img
import Mujeres from "./MUJERES.png";
import Hombres from "./HOMBRE.png";
import Niños from "./NIÑOS.png";

export default function CategorySlide() {
  return (
    <div className="div_categorySlide">
      <div className="img_one_categorySlide">
        <Link to="/clothing/woman">
          <img className="img_categorySlide" src={Mujeres} alt="" width="80%" />
        </Link>
      </div>
      <div className="img_two_categorySlide">
        <Link to="/clothing/men">
          <img className="img_categorySlide" src={Hombres} alt="" width="80%" />
        </Link>
      </div>
      <div className="img_three_categorySlide">
        <Link to="/clothing/kids">
          <img className="img_categorySlide" src={Niños} alt="" width="80%" />
        </Link>
      </div>
    </div>
  );
}
