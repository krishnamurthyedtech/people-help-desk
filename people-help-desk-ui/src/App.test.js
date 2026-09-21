jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}));

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders People Help Desk application', () => {
  render(<App />);
  const headingElements = screen.getAllByText(/People Help Desk/i);
  expect(headingElements.length).toBeGreaterThan(0);
});
