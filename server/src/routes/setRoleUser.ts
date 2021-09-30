import axios from "axios";
import { Response, Request, Router, NextFunction } from 'express';
const router = Router()
require('dotenv').config();
var ManagementClient = require('auth0').ManagementClient;


const { CLIENT_ID_FOR_GET_TOKEN } = process.env
const { SECRET_FOR_GET_TOKEN } = process.env

const management = new ManagementClient({
  domain: 'ecommerce-ropa-henry.us.auth0.com',
  clientId: CLIENT_ID_FOR_GET_TOKEN,
  clientSecret: SECRET_FOR_GET_TOKEN,
});


router.post("/", async (req: Request, response: Response, next: NextFunction) => {
  const { auth0_id, role } = req.body
  let bodyForAssingRolesAuth0,bodyForRemoveRolesAuth0,bodyForRolesUserAppMetadata
  if(role.toLowerCase() === "admin"){
    bodyForAssingRolesAuth0 = { "roles": ["rol_1Zs7o4HFqBBTTYzx"] }; //id del role admin
    bodyForRemoveRolesAuth0 = { "roles": ["rol_jkIrbSqp3ASRUcWP"] }; //id del role user
    bodyForRolesUserAppMetadata = {app_metadata : {
      roles:["admin"]
    }}
  } else{
    bodyForAssingRolesAuth0 = { "roles": ["rol_jkIrbSqp3ASRUcWP"] }; //id del role user
    bodyForRemoveRolesAuth0 = { "roles": ["rol_1Zs7o4HFqBBTTYzx"] }; //id del role admin
    bodyForRolesUserAppMetadata = {app_metadata : {
      roles:["user"]
    }}
  }
  

  try {
    const params = { id: auth0_id };
    const data1 = await management.assignRolestoUser(params, bodyForAssingRolesAuth0);
    const data2 = await management.removeRolesFromUser(params, bodyForRemoveRolesAuth0);
    const data3 = await management.users.update(params, bodyForRolesUserAppMetadata);
    response.json({data1,data2,data3});
  } catch (err) {
    next(err)
  }
});

export default router;
