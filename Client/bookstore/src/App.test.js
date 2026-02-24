import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders main navigation', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/opening your bookstore/i));
  expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /seller/i })).toBeInTheDocument();
});
