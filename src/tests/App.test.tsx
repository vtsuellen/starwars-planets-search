import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa o componente App', () => {
  test('Testa se o componente App é renderizado', () => {
    render(<App />);
    const tableComponent = screen.getByRole('table'); 
    expect(tableComponent).toBeInTheDocument();
  });
});