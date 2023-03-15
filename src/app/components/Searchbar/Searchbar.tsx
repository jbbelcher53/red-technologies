/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface ISearch {
  placeholder: string
  onChange: React.SetStateAction<any>
  className?: string
}

export const Searchbar: React.FC<ISearch> = ({
  placeholder,
  onChange,
  className,
}) => {
  return (
    <div className='flex items-center h-full'>
      <input
        aria-label='search'
        autoComplete='off'
        name='search'
        type='search'
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pl-2 pr-1 h-[32px] sm:px-2 rounded-l-sm py-1 sm:py-2 text-sm text-gray-700 bg-white border-y border-l border-gray-300 outline-none appearance-none focus:border-gray-400 placeholder:text-gray-400 ${className}`}
      />
      <div className='h-[32px] px-2 py-1 text-white bg-blue-600 rounded-r-sm flex items-center justify-center'>
        <MagnifyingGlassIcon width='22' height='22' />
      </div>
    </div>
  )
}
