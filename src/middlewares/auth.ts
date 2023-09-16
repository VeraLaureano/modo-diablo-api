// Import modules
import { NextFunction, Response } from 'express'
import { getUser } from '../services/auth.service'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'

// Define a middleware function to restrict access to certain routes to logged-in users only
export const restrictTologgedInUserOnly = async (req : AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get session ID from cookie
  const { cookies: {uid} } = req


  // Check if user is logged in
  if (!uid)
    // the redirection fails because it sends to the route but with the GET method instead of POST, jajajaja noooo epic fail
    return res.redirect(307, '/api/v1/user/login')

  // Get user object from Map
  const user = getUser(uid)

  // Check if user object exists
  if (!user)
    return res.redirect('/api/v1/user/login')

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
