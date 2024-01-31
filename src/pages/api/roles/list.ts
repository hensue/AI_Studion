import { NextApiRequest, NextApiResponse } from 'next';
import Role from "src/models/role.model"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the API request and response

  if(req.method === 'GET'){
    const data = { message: 'This is a GET request' };
    res.status(200).json(data);
  }else if( req.method === "POST") {
    const {q} = req.body.params;
    try{
        const allData = await Role.find({});
        const roles = await Role.find({ roleName: { $regex: q}});
      
        const result = {
            roles: roles,
            allData: allData,
            total: allData.length,
            params: {
                q
            }
        }
    
        res.status(200).json(result);
    }catch(err) {
        res.status(200).json([])
    }
    
  }
}