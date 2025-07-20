import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BugForm from '../../components/BugForm';

describe('BugForm', () => {
  const mockAddBug = vi.fn().mockResolvedValue({ success: true });
  const mockNavigate = vi.fn();

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });

  vi.mock('../../src/contexts/BugContext', () => ({
    useBugContext: () => ({
      addBug: mockAddBug
    })
  }));

  it('renders the form correctly', () => {
    render(
      <MemoryRouter>
        <BugForm />
      </MemoryRouter>
    );

    expect(screen.getByText('Report a Bug')).toBeInTheDocument();
    expect(screen.getByLabelText('Title*')).toBeInTheDocument();
    expect(screen.getByLabelText('Description*')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Submit Bug')).toBeInTheDocument();
  });

  it('shows error when title is empty', async () => {
    render(
      <MemoryRouter>
        <BugForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit Bug'));
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
  });

  it('submits the form with correct values', async () => {
    render(
      <MemoryRouter>
        <BugForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Title*'), { 
      target: { value: 'Test Bug' } 
    });
    fireEvent.change(screen.getByLabelText('Description*'), { 
      target: { value: 'Test Description' } 
    });
    fireEvent.change(screen.getByLabelText('Priority'), { 
      target: { value: 'high' } 
    });
    fireEvent.click(screen.getByText('Submit Bug'));
    
    expect(mockAddBug).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'Test Description',
      priority: 'high'
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});