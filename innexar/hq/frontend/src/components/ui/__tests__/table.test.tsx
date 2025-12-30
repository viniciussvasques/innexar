import { render, screen } from '@testing-library/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table'

describe('Table Component', () => {
  it('renders complete table structure', () => {
    render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByText('Test Caption')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders multiple rows', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByText('Row 1')).toBeInTheDocument()
    expect(screen.getByText('Row 2')).toBeInTheDocument()
    expect(screen.getByText('Row 3')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector('table')).toHaveClass('custom-table')
  })

  it('renders table without caption', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.queryByRole('caption')).not.toBeInTheDocument()
  })

  it('renders empty table', () => {
    const { container } = render(<Table />)
    expect(container.querySelector('table')).toBeInTheDocument()
  })
})

