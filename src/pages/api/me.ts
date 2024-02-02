import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken"
import User from "src/models/user.model"
import defaultAuthConfig from 'src/configs/auth'

const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the API request and response

  if(req.method === 'GET'){
    const token = req.headers['Authorization']
    jwt.verify(token, jwtConfig.secret as string, async (err: any) => {
      if (err) {
        if (defaultAuthConfig.onTokenExpiration === 'logout') {
          // ** 401 response will logout user from AuthContext file
          return res.status(401).json({
            error: {
              error: "Invalid User"
            }
          })
        } else {
          const oldTokenDecoded = jwt.decode(token, { complete: true })

          // ** Get user id from old token
          // @ts-ignore
          const { id: userId } = oldTokenDecoded.payload
          const user = await User.findOne({ _id: userId})
          const accessToken = jwt.sign({ id: userId}, jwtConfig.secret as string, {
            expiresIn: jwtConfig.expirationTime
          })

          window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
          const obj = {
            userData: {
              id: user._id.toString(),
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: user.role
            }
          }
          res.status(200).json(obj)
        }
      }
    })
  }else if( req.method === "POST") {
    console.log(req.body)
    try{
      const user = await User.findOne({ email: req.body.email})
      
      if(user) {
        if(user.comparePassword(req.body.password)){
          const token = jwt.sign({email: req.body.email, password: req.body.password}, "secret");
          res.status(200).json({
              userData: user,
              accessToken: token
          });
        }
        else {
          res.status(402).json({
            status: false,
            message: "Password is incorrect."
        });
        }
      } else {
        res.status(400).json({
            status: false,
            message: "Invalid username or password."
          })
      }
      
    } catch(err){
      console.log(err);
      res.status(401).json({
        status: false,
        message: "User login is failed."
      })
    }
  }
}