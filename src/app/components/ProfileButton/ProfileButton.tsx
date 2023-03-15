import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'

interface IProfileButton {
  name: string
}

export const ProfileButton: React.FC<IProfileButton> = ({
  name,
}): JSX.Element => {
  const initials = name?.split(' ')
  return (
    <div>
      <Avatar.Root className='p-2 text-white bg-gray-700 rounded-full'>
        <Avatar.Fallback>
          {initials[0].charAt(0)}
          {initials.length > 1 ? initials[initials.length - 1].charAt(0) : null}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
