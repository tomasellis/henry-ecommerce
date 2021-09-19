import React, { useState } from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2'
import { changePassword2 } from '../../../actions';
import './EditProfile.css';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:"1em" 
  },
  root2:{
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows:"1fr 1fr",
    gap:"1em"
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    width: '30ch',
    marginLeft: "8px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30ch',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const provinces = ["Buenos Aires",
"Capital Federal",
"Catamarca",
"Chaco",
"Chubut",
"Córdoba",
"Corrientes",
"Entre Ríos",
"Formosa",
"Jujuy",
"La Pampa",
"La Rioja",
"Mendoza",
"Misiones",
"Neuquén",
"Río Negro",
"Salta",
"San Juan",
"San Luis",
"Santa Cruz",
"Santa Fe",
"Santiago del Estero",
"Tierra del Fuego",
"Tucumán"]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type User = {
  id:string,
  email:string,
  auth0_id:string
}

interface RootState {
  user:User
}

export default function EditProfile() {
  const {user, isAuthenticated, isLoading} = useAuth0()
  const classes = useStyles();
  const theme = useTheme();
  const personName=[]
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state);

  
  const [info, setInfo] = useState({
    name: "",
    lastname: "",
    sex: "",
    date: "",
    dni: undefined,    
  })
  
  const [changePassword, setChangePassword] = useState({
    newpassword: "",
    repeatpassword: "",
  })
  

  const [data, setData] = useState({
    delivery: "",
    number: undefined,
    floor: "",
    apartament: "",
    postalcode: undefined,
    city: "",
    locality: "",
    phone: undefined,
    additionaldata: "",
  })

  if(isLoading) {return (<div>Loading...</div>)}

  const handleChangePassword = (e) => {
    e.preventDefault();
    if(changePassword.newpassword === ""){
      Swal.fire({title: "Write a new password", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(changePassword.repeatpassword !== changePassword.newpassword){
      Swal.fire({title: "Passwords do not match", confirmButtonColor: '#9ea03b'})
      return;
    }
    else{
      alert("Password changed successfully")
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if(info.name === ""){
      Swal.fire({title: "Write your name", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(info.lastname === ""){
      Swal.fire({title: "Write your last name", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(info.sex === ""){
      Swal.fire({title: "Complete this field", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(info.date === ""){
      Swal.fire({title: "Enter a date", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(String(info.dni).length > 8 || String(info.dni).length < 8){
      Swal.fire({title: "Enter a valid ID", confirmButtonColor: '#9ea03b'})
      return;
    }  
    else {
      alert("Dates updates")
    }
  }

  const handleAdditionalData = (e) => {
    e.preventDefault();
    if(data.delivery === ""){
      Swal.fire({title: "Write a address", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(data.number === undefined){
      Swal.fire({title: "Write a number", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(data.postalcode === undefined){
      Swal.fire({title: "Write a postal code", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(data.city === ""){
      Swal.fire({title: "Complete this field", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(data.locality === ""){
      Swal.fire({title: "Write a locality", confirmButtonColor: '#9ea03b'})
      return;
    }
    if(data.phone === undefined){
      Swal.fire({title: "Write a phone", confirmButtonColor: '#9ea03b'})
      return;
    }
    else {
      alert("Dates updates")
    }
  }

  const inputChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const inputChangePassword = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  };

 /*  const handleChange = (event) => {
  }; */

  const changeNewPassword = (e) =>{
    dispatch(changePassword2({
      auth0_id: state.user.auth0_id,
      newPassword: changePassword.repeatpassword
    }))
    console.log(state.user.auth0_id,
      changePassword.repeatpassword)
  }

  return (
    isAuthenticated && <div>
      <div className='div-conteiner'>
                <h3 className='titulo'>PROFILE</h3>
            <div className='conteiner-perfil'>
                <h5>- Data</h5>
                <h5>- Change password</h5>
            </div>
            <div className="conteiner-datos">
              <form 
                className={classes.root}
                noValidate autoComplete="off"
                onSubmit={(e) => 
                  handleUpdate(e)
                }
                >
                <TextField
                  value={info.name}
                  label="Name"
                  name="name"
                  multiline
                  maxRows={4}
                  onChange={(e) => inputChange(e)}
                  />
                <TextField
                  value={info.lastname}
                  label="Last name"
                  name="lastname"
                  multiline
                  maxRows={4}
                  onChange={(e) => inputChange(e)}
                  />
                <div style={{marginTop:"15px"}}>
                <InputLabel className="hardcore">Sex</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  label="Select an option"
                  value={info.sex}
                  name="sex"
                  className={classes.selectEmpty}
                  onChange={(e) => inputChange(e)}
                  >
                  <MenuItem disabled value="">
                    <em>Select an option</em>
                  </MenuItem>
                  <MenuItem value={20}>Male</MenuItem>
                  <MenuItem value={30}>Female</MenuItem>
                </Select>
                </div>
                <TextField
                    value={info.date}
                    label="Birthday"
                    name="date"
                    type="date"
                    defaultValue="00-00-0000"
                    className={classes.textField}
                    onChange={(e) => inputChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                <TextField
                  value={info.dni}
                  label="DNI"
                  name="dni"
                  type="number"
                  multiline
                  maxRows={4}
                  onChange={(e) => inputChange(e)}
                  />
                <FormControl className={classes.selectEmpty} disabled>
                    <InputLabel htmlFor="component-disabled">Email</InputLabel>
                    <Input id="component-disabled" value={user.email}/>
                </FormControl>
                <button 
                  type="submit"
                  style={{width:"50%"}}
                  className="btn">
                  Update
                </button>
              </form>
              <form 
                className={classes.root2}
                noValidate autoComplete="off"
                onSubmit={(e) => handleChangePassword(e)}>
                <TextField
                    label="New Password"
                    name="newpassword"
                    value={changePassword.newpassword}
                    color="secondary"
                    type="password"
                    onChange={(e) => inputChangePassword(e)}
                />
                <TextField
                    label="Repeat Password"
                    name="repeatpassword"
                    value={changePassword.repeatpassword}
                    color="secondary"
                    type="password"
                    onChange={(e) => inputChangePassword(e)}
                />
                <button 
                  type="submit"
                  style={{width:"40%",height:"75%",marginTop:"15px"}} 
                  className="btn"
                  onClick={(e) => changeNewPassword(e)}
                  >
                  Update
                </button>
              </form>
            </div>
            <hr></hr>
            <div className='conteiner-perfil'>
              <h5>- Delivery address</h5>
            </div>
            <div>
              <form 
                className="adicional-data"
                onSubmit={(e) => handleAdditionalData(e)}
                >
                <TextField
                    value={data.delivery}
                    label="Delivery"
                    color="secondary"
                    name="delivery"
                    onChange={(e) => handleChangeData(e)}
                />
                <TextField
                    value={data.number}
                    label="N°"
                    color="secondary"
                    name="number"
                    onChange={(e) => handleChangeData(e)}
                />
                <TextField
                    value={data.floor}
                    label="Floor"
                    multiline
                    name="floor"
                    maxRows={4}
                    onChange={(e) => handleChangeData(e)}
                />
                <TextField
                    value={data.apartament}
                    label="Apartament"
                    multiline
                    name="apartament"
                    maxRows={4}
                    onChange={(e) => handleChangeData(e)} 
                />
                <TextField
                    value={data.postalcode}
                    label="Postal code"
                    type="number"
                    name="postalcode"
                    color="secondary"
                    onChange={(e) => handleChangeData(e)}
                />
                <Select
                  displayEmpty
                  value={data.city}
                  onChange={(e) => handleChangeData(e)} 
                  input={<Input />}
                  name="city"
                  renderValue={(selected) => {
                    if ((selected as string).length === 0) {
                      return <em>Select an city</em>;
                    }
                    return selected ;
                  }}
                  MenuProps={MenuProps} 
                  inputProps={{ 'aria-label': 'Without label' }}
                  >
                  <MenuItem disabled value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {provinces.map((prov) => (
                    <MenuItem key={prov} value={prov} style={getStyles(prov, personName, theme)}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                    value={data.locality}
                    label="Locality"
                    name="locality"
                    color="secondary"
                    onChange={(e) => handleChangeData(e)}
                />
                <TextField
                    value={data.phone}
                    label="Phone"
                    type="number"
                    color="secondary"
                    name="phone"
                    onChange={(e) => handleChangeData(e)}
                />
                <TextField
                    value={data.additionaldata}
                    label="Additional data"
                    name="additionaldata"
                    multiline
                    onChange={(e) => handleChangeData(e)}
                    maxRows={4}
                />
                <button 
                  type="submit"
                  style={{width:"40%", marginLeft:"10%", marginTop:"2%"}} 
                  className='btn'> 
                  Update
                </button>
              </form>
              <hr></hr>
            </div>
        </div>
    </div>
  )
}