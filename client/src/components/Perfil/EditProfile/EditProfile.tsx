import React, { useState } from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import './EditProfile.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:"1em" 
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    width: '25ch',
    marginLeft: "8px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


export default function EditProfile() {
  const {user, isAuthenticated, isLoading} = useAuth0()
  const classes = useStyles();
  if(isLoading) return <div>Loading...</div>


  const handleChange = (event) => {
    
  };

  return (
    <div>
      <div className='div-conteiner'>
                <h3>Profile</h3>
            <div className='conteiner-perfil'>
                <h6>-Data</h6>
                <h6>-Change password</h6>
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
                  <MenuItem value="">
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
                    <Input id="component-disabled" value="email"/>
                </FormControl>
              </form>
              <form className={classes.root} noValidate autoComplete="off">
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
              </form>
            </div>
        </div>
    </div>
  )
}