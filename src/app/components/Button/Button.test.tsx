import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Button } from './Button'

describe('Button test', () => {
  it('should render with click and child', () => {
    render(<Button onClick={() => null}>child</Button>)
    expect(screen.getByText('child')).toBeInTheDocument()
    fireEvent.click(screen.getByText('child'))
  })
})
