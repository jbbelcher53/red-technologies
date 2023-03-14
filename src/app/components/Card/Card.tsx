import React from 'react'

interface CardProps {
  children: React.ReactNode
  footerElement: React.ReactNode
}

export const Card = ({ children, footerElement }: CardProps): JSX.Element => {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>{children}</div>
      <div className='bg-gray-50 px-4 py-4 sm:px-6'>{footerElement}</div>
    </div>
  )
}
