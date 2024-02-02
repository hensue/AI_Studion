import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken"
import User from "src/models/user.model"

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the API request and response

  const error = {
    email: ['Something went wrong']
  }

  if(req.method === 'GET'){
    const data = { message: 'This is a GET request' };
    res.status(200).json(data);
  }else if( req.method === "POST") {
    console.log(req.body)
    try{
      const user = await User.findOne({ email: req.body.email})
      if(user) {
        if(user.comparePassword(req.body.password)){
          const token = jwt.sign({id: user._id.toString()}, jwtConfig.secret as string, {
            expiresIn: jwtConfig.expirationTime
          });
          res.status(200).json({
              userData: {
                id: user._id,
                firstName: user.firstName,
                username: user.username,
                email: user.email
              },
              accessToken: token
          });
        }
        else {
          res.status(400).json({
            error: {
              email: ['Password is Invalid']
            }
          });
        }
      } else {
        res.status(400).json({
          error: {
            email: ['email or Password is Invalid']
          }
        });
      }
      
    } catch(err){
      console.log(err);
      res.status(400).json({
        error
      })
    }
  }
}