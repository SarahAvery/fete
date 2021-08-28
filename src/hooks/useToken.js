import { useState } from 'react';

// const secret = process.env.ACCESS_TOKEN_SECRET
const secret = '67e3cddf8b0254b3a13288ff2d9d0fec8fd0a93f242e7e01bc2ead8f66c8dae42c80bb80cfdbbbcdfef243904e42537da9c495516690ce0669ad7db1d29e7fcd'

const jwt = require('jsonwebtoken')
/*
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
    if (err) return res.sendStatus(403)
    req.user = tokenData
    next()
  })
}
*/

export default function useToken() {

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    console.log('tokenString: ', tokenString)

    // jwt.verify(tokenString, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
    jwt.verify(tokenString, secret, (err, tokenData) => {
      // if (err) return res.sendStatus(403)
      if (err){
        console.log('error: ', err)
        return
      } else {
        console.log('tokenData: ', tokenData)
      }
      return tokenData
    })
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

