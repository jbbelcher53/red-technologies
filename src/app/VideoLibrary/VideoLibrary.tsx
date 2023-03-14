import React from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/Card/Card'
import { Dashboard } from '../components/Dashboard/Dashboard'

export const VideoLibrary = (): JSX.Element => {
  const { id } = useParams<{ id: any }>()
  // const [videos, setVideos] = React.useState
  React.useEffect(() => {
    console.log(id)
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/video-playlist/${id}`)
      const data = await response.json()
      console.log(data)
      return data
    }
    if (id) {
      fetchData()
    }
  }, [id])
  return (
    <Dashboard>
      <div className='flex flex-col py-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 h-auto'>
          <Card footerElement={<div>stuff for footer</div>}>
            <div>Card for video</div>
          </Card>
        </div>
      </div>
    </Dashboard>
  )
}
