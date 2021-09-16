import {useAuth0} from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

//import css
import './Profile.css'

//import component
import Logout from './Logout';
import Favorites from './Favorites/Favorites';
import EditProfile from './EditProfile/EditProfile';

export default function Profile() {
  const {user, isAuthenticated, isLoading} = useAuth0()
  console.log(user);
  
  if(isLoading) return <div>Loading...</div>  
  return (
    isAuthenticated && <div>
      <div className = 'div_lateralProfile'>
                <div className = 'div_profile'>
                    <img className = 'img_profile_profile' src={user.picture} alt={user.name} />
                    <h1 className = 'name_title_profile'>{user.name}</h1>
                    <p className = 'email_p_profile'>{user.email}</p>
                    <Logout  />  
                    <hr className = 'hr_profile'/>
                    <Link to = '/profile'>
                      <h1 className = 'edit_profile_h1_profile'>Edit Profile</h1>
                      <hr className = 'hr_profile' />
                    </Link>
                    <Link to = '/profile/shopping-history'>
                        <h1 className = 'history_h1_profile'>Shopping History</h1>
                    </Link>
                    <hr  className = 'hr_profile' />
                    <Link to = '/profile/favorites'>
                        <h1 className = 'favorites_h1_profile'>Favorites</h1>
                    </Link>
                    <hr className = 'hr_profile' />
                </div>
                    {/* <EditProfile/> */}
            </div>
    </div>
  )
}