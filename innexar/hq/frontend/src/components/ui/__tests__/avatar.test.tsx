import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from '../avatar'

describe('Avatar Component', () => {
  it('renders avatar with image', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByAltText('User Avatar')).toBeInTheDocument()
  })

  it('renders fallback when image fails to load', async () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-url" alt="Failed Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    // Fallback should be present
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders fallback with initials', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('applies custom className to avatar', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    )
    expect(container.firstChild).toHaveClass('custom-avatar')
  })

  it('applies custom className to fallback', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback">EF</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('EF')).toHaveClass('custom-fallback')
  })

  it('renders with different sizes via className', () => {
    const { container } = render(
      <Avatar className="h-20 w-20">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    )
    expect(container.firstChild).toHaveClass('h-20', 'w-20')
  })
})

