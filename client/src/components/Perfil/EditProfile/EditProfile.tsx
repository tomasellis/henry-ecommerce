import React, { useState } from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Profile from '../Profile';
import './EditProfile.css';

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

export default function EditProfile() {
  const {user, isAuthenticated, isLoading} = useAuth0()
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange2 = (event) => {
    setPersonName(event.target.value);
  };
  if(isLoading) return <div>Loading...</div>

  const handleChange = (event) => {
    
  };

  return (
    <div className = 'divqencierratodo'>
      <Profile />
      <div className='div-conteiner'>
                <h3 className='titulo'>PROFILE</h3>
            <div className='conteiner-perfil'>
                <h5>- Data</h5>
                <h5>- Change password</h5>
            </div>
            <div className="conteiner-datos">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="standard-multiline-flexible"
                  label="Name"
                  multiline
                  maxRows={4}
                  
                  />
                <TextField
                  id="standard-multiline-flexible"
                  label="Last name"
                  multiline
                  maxRows={4}
                  
                  />
                <div style={{marginTop:"15px"}}>
                {/* <InputLabel>Sex</InputLabel> */}
                <Select
                  labelId="demo-simple-select-helper-label"
                  label="Select an option"
                  id="demo-simple-select-helper"
                  className={classes.selectEmpty}
                  >
                  <MenuItem disabled value="">
                    <em>Select an option</em>
                  </MenuItem>
                  <MenuItem value={20}>Male</MenuItem>
                  <MenuItem value={30}>Female</MenuItem>
                </Select>
                </div>
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="00-00-0000"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                <TextField
                  id="standard-multiline-flexible"
                  label="DNI"
                  multiline
                  maxRows={4}
                  
                  />
                <FormControl className={classes.selectEmpty} disabled>
                    <InputLabel htmlFor="component-disabled">Email</InputLabel>
                    <Input id="component-disabled" value={user.email}/>
                </FormControl>
                <button style={{width:"40%"}} className="btn">
                  Update
                </button>
              </form>
              <form className={classes.root2} noValidate autoComplete="off">
                <TextField
                    id="filled-secondary"
                    label="Current Password"
                    color="secondary"
                />
                <TextField
                    id="filled-secondary"
                    label="New Password"
                    color="secondary"
                />
                <TextField
                    id="filled-secondary"
                    label="Repeat Password"
                    color="secondary"
                />
                <button style={{width:"20%"}} className="btn">
                  Update
                </button>
              </form>
            </div>
            <hr></hr>
            <div className='conteiner-perfil'>
              <h5>- Delivery address</h5>
            </div>
            <div>
              <form className="adicional-data">
                <TextField
                    id="filled-secondary"
                    label="Delivery"
                    color="secondary"
                />
                <TextField
                    id="filled-secondary"
                    label="N°"
                    color="secondary"
                />
                <TextField
                    id="standard-multiline-flexible"
                    label="Floor"
                    multiline
                    maxRows={4}
                    
                />
                <TextField
                    id="standard-multiline-flexible"
                    label="Apartament"
                    multiline
                    maxRows={4}
                    
                />
                <TextField
                    id="filled-secondary"
                    label="Postal code"
                    color="secondary"
                />
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange2} 
                  input={<Input />}
                  renderValue={(selected) => {
                    if ((selected as string[]).length === 0) {
                      return <em>Select an option</em>;
                    }

                    return (selected as string[]).join(', ');
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
                    id="filled-secondary"
                    label="Locality"
                    color="secondary"
                />
                <TextField
                    id="filled-secondary"
                    label="Phone"
                    color="secondary"
                />
                <TextField
                    id="standard-multiline-flexible"
                    label="Additional data"
                    multiline
                    maxRows={4}
                    
                />
                <button style={{width:"40%"}} className='btn'> 
                  Update
                </button>
              </form>
              <hr></hr>
            </div>
        </div>
    </div>
  )
}