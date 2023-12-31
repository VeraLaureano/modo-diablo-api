import { Response } from 'express'
import { createAlbum, findAllAlbums, findAndDeleteAlbum, findAndUpdateAlbum, findOneAlbum } from '../services/album.service'
import { asyncWrapper } from '../utils/asyncWrapper'
import { AuthenticatedRequest } from '../interfaces/authRequest.interface'
import AlbumModel from '../models/Album.model'
import { regex } from '../utils/regex'
import { deleteSuccess, internalServerError } from '../utils/messages'
import { CREATED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NO_CONTENT } from '../config/statusCode'

/**
 * @method [GET]
 * @description search all albums
 */
export const getAllAlbums = asyncWrapper(
  async ({query: {page, perPage, artist, genre}}: AuthenticatedRequest, res: Response) => {
    const pageNumber: number = parseInt(page as string, 10) || 1
    const totalAlbums: number = await AlbumModel.countDocuments({})
    const albumsPerPage: number = parseInt(perPage as string, 10) || totalAlbums

    let dataFind: object = {}

    if (artist as string) dataFind = {...dataFind, artist: regex(artist as string)}
    if (genre as string) dataFind = {...dataFind, genre: regex(genre as string)}

    const data = await findAllAlbums(pageNumber, albumsPerPage, dataFind)

    res.status(EVERYTHING_OK).json(data)
  }
)

/**
 * @method [GET]
 * @description search a album with id in params
 */
export const getOneAlbum = asyncWrapper(
  async ({params: {id}}: AuthenticatedRequest, res: Response) => {
    const data = await findOneAlbum(id)

    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('album', id))

    return res.status(EVERYTHING_OK).json(data)
  }
)

/**
 * @method [POST]
 * @description post a new album in the db
 */
export const postAlbum = asyncWrapper(
  async ({body}: AuthenticatedRequest, res: Response) => {
    const newData = await createAlbum(body)
    return res.status(CREATED).json(newData)
  }
)

/**
 * @method [PATCH]
 * @description update the found album
 */
export const patchAlbum = asyncWrapper(
  async ({params: {id}, body}: AuthenticatedRequest, res: Response) => {
    const data = await findAndUpdateAlbum(id, body)

    if (!data)
      res.status(INTERNAL_SERVER_ERROR).json({
        message: `NO_ALBUM_WITH_ID_${id}`,
        error: 'INTERNAL_SERVER_ERROR',
        statusCode: INTERNAL_SERVER_ERROR
      })
    
    return res.status(CREATED).json(data)
  }
)

/**
 * @method [DELETE]
 * @description delete the soung album
 */
export const deleteAlbum = asyncWrapper(
  async ({params: {id}}: AuthenticatedRequest, res: Response) => {
    const data = await findAndDeleteAlbum(id)

    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json(internalServerError('album', id))

    return res.status(NO_CONTENT).json(deleteSuccess)
  }
)