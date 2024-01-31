import { NextApiRequest, NextApiResponse } from 'next';
import Role from "src/models/role.model"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the API request and response

  if(req.method === 'GET'){
    const data = { message: 'This is a GET request' };
    res.status(200).json(data);
  }else if( req.method === "POST") {
    console.log("========== Create Role =========")
    console.log(req.body)
    try{
      const role = await Role.create(req.body)
      res.status(200).json({
        status: true,
        role: role
      })
    } catch(err){
      console.log(err);
      res.status(200).json({
        status: false,
        message: "Role was created successfully."
      })
    }
  }
}