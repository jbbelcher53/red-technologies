import React from 'react'

interface IButton {
  onClick: () => void
  children: React.ReactNode
  className?: string | undefined
}
export const Button: React.FC<IButton & React.ComponentProps<'button'>> = ({
  onClick,
  className = '',
  children,
  ...rest
}): JSX.Element => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={` ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
