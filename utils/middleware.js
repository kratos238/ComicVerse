import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions from '../node_modules/cors/lib/index.js'
import users from '../routes/users.js'
// import models
import User from '../models/users.js'

// function to create context property in every request with shared data
const applicationContext = (req, res, next) => {
  // data to share can be added in this object
  req.context = {
    models: { User },
  }
  // move on to next middleware
  next()
}

const registerMiddleware = app => {
  app.use(cors(corsOptions)) // cors headers
  app.use(cookieParser()) // parse cookies
  app.use(express.json()) // parse json bodies
  app.use(morgan("tiny")) // logging
  app.use(applicationContext) // add context object to request
  app.use("/auth", users) // register routes for  "/" urls
}

export default registerMiddleware