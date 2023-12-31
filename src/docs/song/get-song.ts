export const getOneSongDocV1 = {
  get: {
    tags: ['Song READ operations'], 
    description: 'Get one Song from the database',
    operationId: 'getOneSong',
    parameters: [ {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/songID',
      },
      required: true,
      description: 'A single Song id',
    }],
    responses: {
      200: {
        description: 'Song were obtained', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Song',
            },
          },
        },
      },
      401: {
        description: 'Authorization required', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Unauthorized',
            },
          },
        },
      },
      500: {
        description: 'If Song not found send a 500 status code (Internal Server Error)', // response desc.
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ISError',
            },
          },
        },
      }
    },
  },
}