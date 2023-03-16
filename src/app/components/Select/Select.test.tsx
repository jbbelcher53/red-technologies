import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'
/**
 * JSDOM doesn't implement PointerEvent so we need to mock our own implementation
 * Default to mouse left click interaction
 * https://github.com/radix-ui/primitives/issues/1822
 * https://github.com/jsdom/jsdom/pull/2666
 */
class MockPointerEvent extends Event {
  button: number

  ctrlKey: boolean

  pointerType: string

  constructor(type: string, props: PointerEventInit) {
    super(type, props)
    this.button = props.button || 0
    this.ctrlKey = props.ctrlKey || false
    this.pointerType = props.pointerType || 'mouse'
  }
}

window.PointerEvent = MockPointerEvent as any
window.HTMLElement.prototype.scrollIntoView = jest.fn()
window.HTMLElement.prototype.releasePointerCapture = jest.fn()
window.HTMLElement.prototype.hasPointerCapture = jest.fn()

const SelectTest = ({ noDefault }: { noDefault: boolean }) => {
  const [filter, setFilter] = React.useState('')
  return (
    <div>
      <Select
        noDefault={noDefault}
        filter={filter}
        setFilter={setFilter}
        options={[
          'Standard',
          'Sale Order',
          'Purchase Order',
          'Transfer Order',
          'Return Order',
        ]}
        placeholder='Order Type'
      />
    </div>
  )
}

describe('Select test', () => {
  it('should render with no default option of Order type to select then select sale order', async () => {
    const user = userEvent.setup()
    render(<SelectTest noDefault />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByText('Purchase Order')).toBeInTheDocument()
    await user.click(screen.getByText('Purchase Order'))
    expect(screen.getByRole('combobox')).toHaveAttribute('data-state', 'closed')
    expect(screen.getByText('Purchase Order')).toBeInTheDocument()
  })
})
