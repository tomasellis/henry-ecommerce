import React from "react";
import "./footer.css"

const Footer = () => (
  <div className="footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Name</h4>
            <h1 className="list-unstyled">
              <li>thing</li>
              <li>Buenos Aires, Argentina</li>
              <li>Calle falsa</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Staff</h4>
            <ul className="list-unstyled">
              <li>Homero</li>
              <li>bart</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>cosas</h4>
            <ul className="list-unstyled">
              <li>DANK MEMES</li>
              <li>OTHER STUFF</li>
              <li>GUD STUFF</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} ALGO BONITO | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
);

export default Footer;
