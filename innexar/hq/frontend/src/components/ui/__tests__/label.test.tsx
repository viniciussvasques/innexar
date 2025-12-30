import { render, screen } from '@testing-library/react'
import { Label } from '../label'

describe('Label Component', () => {
  it('renders label text', () => {
    render(<Label>Username</Label>)
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('shows required asterisk when required prop is true', () => {
    render(<Label required>Email</Label>)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not show asterisk when required is false', () => {
    render(<Label>Optional Field</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Test</Label>)
    const label = screen.getByText('Test')
    expect(label).toHaveClass('custom-label')
  })

  it('connects to input via htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" />
      </div>
    )
    const label = screen.getByText('Test Label')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('renders as label element', () => {
    const { container } = render(<Label>Test</Label>)
    expect(container.querySelector('label')).toBeInTheDocument()
  })
})

