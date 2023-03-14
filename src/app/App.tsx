import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import '../tailwind.css'
import { VideoLibrary } from './VideoLibrary/VideoLibrary'

export const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <div className='flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden'>
          <div className='relative w-full'>
            <div className='absolute top-56 left-56 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply animate-blob' />
            <div className='absolute top-48 right-24 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply animate-blob animation-delay-2000' />
            <div className='absolute bottom-36 left-36 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply animate-blob animation-delay-4000' />
            <div className='absolute bottom-48 right-56 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply animate-blob animation-delay-6000' />
            <div className='relative h-screen'>
              <div className='flex-1 h-screen'>
                <div className='h-full w-full bg-white flex flex-col rounded-lg items-center justify-center filter backdrop-blur-lg bg-transparent'>
                  <h1 className='text-8xl font-bold text-red-700 p-4 m-4'>
                    Clearmix
                  </h1>
                  <ul>
                    <li>
                      <Link to='/video-playlist/dog'>Dog</Link>
                    </li>
                  </ul>
                  <div className='flex flex-row space-x-12 w-auto h-16 justify-center' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Route>
      <Route exact path='/video-playlist/:id'>
        <VideoLibrary />
      </Route>
    </Switch>
  )
}
