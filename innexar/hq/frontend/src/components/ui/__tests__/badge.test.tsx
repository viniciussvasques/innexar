import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge Component', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies default variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-primary')
  })

  it('applies secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText('Secondary')
    expect(badge).toHaveClass('bg-secondary')
  })

  it('applies destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-destructive')
  })

  it('applies success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-500')
  })

  it('applies warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-yellow-500')
  })

  it('applies outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText('Outline')
    expect(badge).toHaveClass('text-foreground')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })

  it('passes through HTML attributes', () => {
    render(<Badge data-testid="test-badge">Test</Badge>)
    expect(screen.getByTestId('test-badge')).toBeInTheDocument()
  })
})

