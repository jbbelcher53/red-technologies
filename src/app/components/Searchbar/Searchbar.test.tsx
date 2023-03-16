import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Searchbar } from './Searchbar'

const SearchbarTest = () => {
  const [search, setSearch] = React.useState(false)
  return (
    <div>
      <Searchbar placeholder='Order ID Search' onChange={setSearch} />
      <div>{search}</div>
    </div>
  )
}

describe('Searchbar test', () => {
  it('should render and type', () => {
    render(<SearchbarTest />)
    expect(screen.getByPlaceholderText('Order ID Search')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('searchbox'))
    fireEvent.input(screen.getByRole('searchbox'), {
      target: { value: 'test' },
    })
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
