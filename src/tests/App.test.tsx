import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { returnData } from './mock/apiPlanetsMock';

describe('Testa o componente App', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(returnData),
    });
  });
  test('Testa se o componente App é renderizado', () => {
    render(<App />);
    const tableComponent = screen.getByRole('table'); 
    expect(tableComponent).toBeInTheDocument();
  });
});