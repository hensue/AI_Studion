import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken";
import User from "src/models/user.model";

const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the API request and response

  if(req.method === 'GET'){
    const data = { message: 'This is a GET request' };
    res.status(200).json(data);
  }else if( req.method === "POST") {
    console.log(req.body)
    try{
      const { email, username, password } = req.body;
      let emailAlreadyUse = await User.find({ email: email })
      let usernameAlreadyUse = await User.find({ username: username })
      const error = {
        email: emailAlreadyUse.length > 0 ? 'This email is already in use.' : null,
        username: usernameAlreadyUse.length > 0 ? 'This username is already in use.': null
      }
      if(!error.username && !error.email) {
        const user = new User({
          username: email,
          email: username,
          password: password
        })
        const savedUser = await user.save()
        if(savedUser) {
          const token = jwt.sign({ id: savedUser._id.toString() }, jwtConfig.secret as string);
          const userData = {
            id: savedUser._id.toString(),
            username: savedUser.username,
            email: savedUser.email,
            firstName: savedUser.firstName,
            avatar: savedUser.avatar,
            role: savedUser.role
          }
          res.status(200).json({
              accessToken: token
          });
        } else {
          res.status(400).json({
              error: error
            })
        }
         
      } else {
        res.status(200).json({
          error
        })
      }
    } catch(err){
      console.log(err);
      res.status(401).json({
        error: 'Ivalid Data'
      })
    }
  }
}