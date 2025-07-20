// src/tests/unit/BugItem.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BugItem from '../../components/BugItem'

const mockBug = {
  _id: '1',
  title: 'Test Bug',
  description: 'This is a test bug description',
  status: 'open',
  priority: 'medium',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-02T00:00:00.000Z'
}

describe('BugItem Component', () => {
  it('renders bug details correctly', () => {
    render(
      <MemoryRouter>
        <BugItem bug={mockBug} />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Test Bug')).toBeInTheDocument()
    expect(screen.getByText('This is a test bug description')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('Created: 1/1/2023')).toBeInTheDocument()
    expect(screen.getByText('Updated: 1/2/2023')).toBeInTheDocument()
  })

  it('has correct link to bug details', () => {
    render(
      <MemoryRouter>
        <BugItem bug={mockBug} />
      </MemoryRouter>
    )
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/bugs/1')
  })
})