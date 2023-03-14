import React from 'react'

interface DashboardProps {
  children: React.ReactNode
}

export const Dashboard = ({ children }: DashboardProps): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  return (
    <div>
      <div className={`${sidebarOpen ? 'flex' : 'hidden'}`}>
        <div className='fixed inset-0 flex z-40 md:hidden'>
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />

          <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800'>
            <div className='absolute top-0 right-0 -mr-12 pt-2'>
              <button
                type='button'
                className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                onClick={() => setSidebarOpen(false)}
              >
                <span className='sr-only'>Close sidebar</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    stroke='#e2e8f0'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex-shrink-0 px-4 flex items-center'>
              <h2 className='font-bold text-lg text-white'>Filters</h2>
            </div>
            <div className='mt-5 flex-1 h-0 overflow-y-auto'>
              <nav className='px-2 space-y-1'>
                {/* {filters.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    >
                      {item.name}
                    </a>
                  ))} */}
              </nav>
            </div>
          </div>
          <div className='flex-shrink-0 w-14' aria-hidden='true' />
        </div>
      </div>

      <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
        <div className='flex-1 flex flex-col min-h-0 bg-gray-800'>
          <div className='flex items-center h-16 flex-shrink-0 px-4 bg-gray-900'>
            <h2 className='font-bold text-lg text-white'>Filters</h2>
          </div>
          <div className='flex-1 flex flex-col overflow-y-auto'>
            <nav className='flex-1 px-2 py-4 space-y-1'>
              {/* {filters.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  >
                    {item.name}
                  </a>
                ))} */}
            </nav>
          </div>
        </div>
      </div>
      <div className='md:pl-64 flex flex-col'>
        <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
          <button
            type='button'
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                stroke='#e2e8f0'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        <main className='flex-1'>
          <div className='py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              <h1 className='text-2xl font-semibold text-gray-900'>Videos</h1>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
