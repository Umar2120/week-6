import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProductList from './ProductList';

// Mock the fetch API globally
global.fetch = vi.fn();

describe('ProductList - API Mocking', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
  });

  test('renders loading state initially', async () => {
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => [{ id: 1, name: 'Product 1', price: 10 }],
              }),
            100
          )
        )
    );

    render(<ProductList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  test('displays products after successful fetch', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10, description: 'First product' },
      { id: 2, name: 'Product 2', price: 20, description: 'Second product' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
    });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Price: $20')).toBeInTheDocument();
  });

  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  test('displays error message when API returns non-ok status', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText(/HTTP error/)).toBeInTheDocument();
    });
  });

  test('displays empty message when no products are returned', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });
  });

  test('uses the provided apiUrl for fetch', async () => {
    const customUrl = 'https://api.custom.com/v1/products';
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Product', price: 15, description: 'Test' }],
    });

    render(<ProductList apiUrl={customUrl} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(customUrl);
    });
  });

  test('refetches data when apiUrl prop changes', async () => {
    const url1 = 'https://api1.com/products';
    const url2 = 'https://api2.com/products';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Products from API 1', price: 10, description: 'API 1' }],
    });

    const { rerender } = render(<ProductList apiUrl={url1} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(url1);
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 2, name: 'Products from API 2', price: 20, description: 'API 2' }],
    });

    rerender(<ProductList apiUrl={url2} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(url2);
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  test('handles JSON parsing errors gracefully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
    });
  });

  test('displays product prices formatted correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Expensive Item', price: 999.99, description: 'Very expensive' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Price: $999.99')).toBeInTheDocument();
    });
  });

  test('renders heading for product list', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Product', price: 10, description: 'Test' }],
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
    });
  });
});