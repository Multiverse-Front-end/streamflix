import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App'; 
import AuthContextProvider from '../context/AuthContext'; 
import { act } from 'react'; 

test('renders learn react link', async () => {
  await act(async () => {
    render(
      <Router>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Router>
    );
  });

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
