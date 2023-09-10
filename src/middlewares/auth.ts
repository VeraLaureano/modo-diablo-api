// Import modules
import { NextFunction, Response } from 'express'
import { getUser } from '../services/auth.service'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import { VERSION } from '../config/env'

// Define a middleware function to restrict access to certain routes to logged-in users only
export const restrictTologgedInUserOnly = async (req : AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get session ID from cookie
  const { cookies: {uid} } = req

  // Check if user is logged in
  if (!uid)
    return res.render('login', { method: 'POST', VERSION: VERSION, message: 'UNAUTHORIZED' })

  // Get user object from Map
  const user = getUser(uid)

  // Check if user object exists
  if (!user)
    return res.render('login', { method: 'POST', VERSION: VERSION, message: 'UNAUTHORIZED' })

  req.user = user

  // Call next middleware function
  next()
}

export const checkAuth = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  // Get session ID from cookie
  const { cookies: {uid} } = req

  // Get user object from Map
  const user = getUser(uid)

  req.user = user
  
  // Call next middleware function
  next()
}