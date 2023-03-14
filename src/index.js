/* eslint-disable global-require */
import('./bootstrap')
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser')
  worker.start()
}
