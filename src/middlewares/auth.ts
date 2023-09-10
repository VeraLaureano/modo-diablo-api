// Import modules
import { NextFunction, Response } from 'express'
import { getUser } from '../services/auth.service'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'

// Define a middleware function to restrict access to certain routes to logged-in users only
export const restrictTologgedInUserOnly = async ({ cookies: {uid} } : AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Check if user is logged in
  if (!uid)
    return res.redirect(401, '/login')

  // Get user object from Map
  const user = getUser(uid)

  // Check if user object exists
  if (!user)
    return res.redirect(401, '/login')

  // Call next middleware function
  next()
}

export const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get session ID from cookie
  const { cookies: {uid} } = req

  // Get user object from Map
  const user = getUser(uid)

  // Check if user is authenticated
  if (!user) 
    return res.redirect(401, '/login')
  
  // Call next middleware function
  next()
}
