import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input Component', () => {
  it('renders input correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('displays error message', () => {
    render(<Input id="test-input" error="This field is required" />)
    
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies error styling when error prop is passed', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-destructive')
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    
    rerender(<Input type="password" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password')
  })

  it('handles onChange callback', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalledTimes(4) // once per character
  })

  it('connects error message with input via aria-describedby', () => {
    render(<Input id="test-input" error="Error text" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
  })
})

