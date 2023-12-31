import { VERSION } from './env'

const routes = {
  user: `/api/${VERSION}/user`,
  admin: `/api/${VERSION}/admin`,
  artists: `/api/${VERSION}/artists`,
  albums: `/api/${VERSION}/albums`,
  songs: `/api/${VERSION}/songs`,
  dev: '/api/secret-side/dev',
  csfr: `/api/${VERSION}/csrf-token`,
  docs: '/api-docs'
}

export default routes