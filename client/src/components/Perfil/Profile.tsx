import {useAuth0} from '@auth0/auth0-react'
import Logout from '../Logout'

export default function Profile() {
  const {user, isAuthenticated, isLoading} = useAuth0()

  if(isLoading) return <div>Loading...</div>

  return (
    isAuthenticated && <div>
      <div className='div-conteiner'>
                <h3>Profile</h3>
            <div className='conteiner-perfil'>
                <h6>-Data</h6>
                <h6>-Change password</h6>
            </div>
            <div className='cont-data'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Logout />
    </div>
  )
}