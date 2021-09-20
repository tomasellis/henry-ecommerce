import { Link } from 'react-router-dom';

//import css
import './LateralProfile.css';

//import components
import Logout from './Logout'

export default function LateralProfile({img, name, email}){
    return(
        <>
            <div className = 'div_lateralProfile'>
                <div className = 'div_profile'>
                    <img className = 'img_profile_profile' src={img} alt={name} />
                    <h1 className = 'name_title_profile'>{name}</h1>
                    <p className = 'email_p_profile'>{email}</p>
                    <Logout  />  
                    <hr className = 'hr_profile'/>
                    <Link to = '/shopping-history/'>
                        <h1 className = 'history_h1_profile'>Shopping history</h1>
                    </Link>
                    <hr  className = 'hr_profile' />
                    <Link to = '/favorites'>
                        <h1 className = 'favorites_h1_profile'>Favorites</h1>
                    </Link>
                    <hr className = 'hr_profile' />
                </div>
            </div>
        </>
    )
};