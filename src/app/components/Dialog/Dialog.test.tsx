import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Dialog } from './Dialog'

const DialogTest = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      trigger={<button type='button'>open</button>}
      title='title'
      description='description'
      submitButton={<button type='button'>submit</button>}
    >
      child
    </Dialog>
  )
}

describe('Dialog test', () => {
  it('should render not opened then click the button and should open and should close out after clicking submit', () => {
    render(<DialogTest />)
    expect(screen.getByText('open')).toBeInTheDocument()
    fireEvent.click(screen.getByText('open'))
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByText('submit')).toBeInTheDocument()
    fireEvent.click(screen.getByText('submit'))
  })
})
