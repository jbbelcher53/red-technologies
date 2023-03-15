import { render, screen } from '@testing-library/react'
import React from 'react'
import { ProfileButton } from './ProfileButton'

describe('Profile Button test', () => {
  it('should render with initials of name', () => {
    render(<ProfileButton name='James Belcher' />)
    expect(screen.getByText('JB')).toBeInTheDocument()
  })
})
