import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card'

describe('Card Component', () => {
  it('renders card with all subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card" />)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('renders CardTitle with correct styles', () => {
    render(<CardTitle>Title</CardTitle>)
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H3')
  })

  it('renders CardDescription with muted text', () => {
    render(<CardDescription>Description text</CardDescription>)
    const description = screen.getByText('Description text')
    expect(description).toHaveClass('text-muted-foreground')
  })

  it('handles empty card', () => {
    render(<Card data-testid="empty-card" />)
    expect(screen.getByTestId('empty-card')).toBeInTheDocument()
  })

  it('passes through HTML attributes', () => {
    render(<Card data-testid="card" aria-label="Test Card" />)
    expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Test Card')
  })
})

