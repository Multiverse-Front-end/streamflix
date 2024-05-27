
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';
import { UserAuth } from '../context/AuthContext';

jest.mock('../context/AuthContext');

describe('Login Component', () => {
  const mockLogIn = jest.fn();

  beforeEach(() => {
    UserAuth.mockReturnValue({
      logIn: mockLogIn,
    });
  });

  test('renders Login component', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows user to log in', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('displays error message on login failure', async () => {
    const errorMessage = 'Invalid login credentials';
    mockLogIn.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
