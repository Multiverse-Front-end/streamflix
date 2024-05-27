import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; 
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../pages/Signup';
import { UserAuth } from '../context/AuthContext';

jest.mock('../context/AuthContext', () => ({
  UserAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Signup Component', () => {
  const mockSignUp = jest.fn();

  beforeEach(() => {
    UserAuth.mockReturnValue({
      user: null,
      signUp: mockSignUp,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Signup component', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  });

  test('allows user to sign up', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
