import { Link } from "react-router-dom";

//import css
import "./cards.css";

export default function Cards() {
  return (
    <>
      <div className="cards_container_products">
        <div className="div_container_card_product">
          <div className="div_card_product">
            <Link to="details/1">
              <img
                src="https://img.hollisterco.com/is/image/anf/KIC_331-2290-2334-280_model1?policy=product-medium"
                alt=""
              />
              <h3 className="card_name_product">Jean Liso</h3>
              <h5 className="card_desc_product">
                <b>$45.2</b>
              </h5>
            </Link>
          </div>
        </div>
        <div className="div_container_card_product">
          <div className="div_card_product">
            <Link to="details/2">
              <img
                src="https://img.hollisterco.com/is/image/anf/KIC_328-1501-0041-279_prod1?policy=product-medium"
                alt=""
              />
              <h3 className="card_name_product">Short gastado clasico</h3>
              <h5 className="card_desc_product">
                <b>$45.2</b>
              </h5>
            </Link>
          </div>
        </div>
        <div className="div_container_card_product">
          <div className="div_card_product">
            <Link to="details/1">
              <img
                src="https://img.hollisterco.com/is/image/anf/KIC_314-1000-0707-900_prod1?policy=product-medium"
                alt=""
              />
              <h3 className="card_name_product">
                Canzolcillos cortos clasicos
              </h3>
              <h5 className="card_desc_product">
                <b>$45.2</b>
              </h5>
            </Link>
          </div>
        </div>
        <div className="div_container_card_product">
          <div className="div_card_product">
            <Link to="details/1">
              <img
                src="https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-210_prod1?policy=product-medium"
                alt=""
              />
              <h3 className="card_name_product">
                Camisa Oxford Elastizada de Corte Suelto
              </h3>
              <h5 className="card_desc_product">
                <b>$45.2</b>
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
