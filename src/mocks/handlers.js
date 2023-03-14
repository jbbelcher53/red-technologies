import { rest } from 'msw'
import { videoData } from './data'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    )
  }),
  // Handles a GET /user request
  rest.get('/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    )
  }),
  // Handles a Get /video-playlist/:id request
  rest.get('/video-playlist/:id', (req, res, ctx) => {
    const { id } = req.params

    const returnData = videoData.find(video => video.id === id)
    return res(ctx.status(200), ctx.json(returnData))
  }),
]
