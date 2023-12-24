import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('launching', () => {
  it('should display banner', () => {
    render(<App />);
    screen.getByText(/Find a recipe/);
  });
});
