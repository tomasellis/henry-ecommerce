import React from "react";
import "./footer.css"
import {AiFillGithub} from 'react-icons/ai';



const Footer = () => (
  <div className="footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col name">
            <h2>Cute Clothes</h2>
            <h1 className="list-unstyled">
              <li>Buenos Aires, Argentina</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col name">
            <h4>Staff</h4>
            <ul className="list-unstyled">
              <li><a href="https://github.com/tomasellis" target="_blank" rel="noreferrer"><AiFillGithub className='iconGIT'/>  Tomas  Ellis</a></li>
              <li><a href="https://github.com/julyanpatricio" target="_blank" rel="noreferrer"><AiFillGithub className='iconGIT'/>  Julian Rodriguez</a></li>
              <li><a href="https://github.com/Dylan0907" target="_blank" rel="noreferrer"><AiFillGithub className='iconGIT'/>  Eduardo Sanguinetti</a></li>
              <li><a href="https://github.com/Mateoo-pierre" target="_blank" rel="noreferrer"><AiFillGithub className='iconGIT'/>  Mateo Pierre</a></li>
              <li><a href="https://github.com/ulises2125" target="_blank" rel="noreferrer"><AiFillGithub className='iconGIT'/>  Ulises Scardino</a></li>
              <li><a href="https://github.com/alexiscjscab" target="_blank" rel="noreferrer"><AiFillGithub className='iconGIT'/>  Alexis Beas</a></li>
            </ul>
          </div>
          {/* Column3 */}
          
        </div>
        <hr />
        <div className="container bottom">
        <div className="row">
          <p className="col-sm">
            &copy; {new Date().getFullYear()} CUTE CLOTHES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
        </div>
      </div>
    </div>
);

export default Footer;
