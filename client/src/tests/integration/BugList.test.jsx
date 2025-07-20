// src/tests/integration/BugList.test.jsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BugProvider } from '../../context/BugContext'
import BugList from '../../components/BugList'

// Mock API service
jest.mock('../../services/bugService', () => ({
  getBugs: jest.fn(() => Promise.resolve([
    {
      _id: '1',
      title: 'First Bug',
      description: 'First bug description',
      status: 'open',
      priority: 'high',
      createdAt: '2023-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Second Bug',
      description: 'Second bug description',
      status: 'resolved',
      priority: 'low',
      createdAt: '2023-01-02T00:00:00.000Z'
    }
  ]))
}))

describe('BugList Integration Test', () => {
  it('displays a list of bugs', async () => {
    render(
      <MemoryRouter>
        <BugProvider>
          <BugList />
        </BugProvider>
      </MemoryRouter>
    )
    
    // Loading state
    expect(screen.getByText('Loading bugs...')).toBeInTheDocument()
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading bugs...')).not.toBeInTheDocument()
      expect(screen.getByText('First Bug')).toBeInTheDocument()
      expect(screen.getByText('Second Bug')).toBeInTheDocument()
      expect(screen.getByText('Open')).toBeInTheDocument()
      expect(screen.getByText('Resolved')).toBeInTheDocument()
    })
  })
})