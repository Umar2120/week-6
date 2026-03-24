import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  test('renders without crashing', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('displays the correct title passed via props', () => {
    render(<Card title="My Card">Content</Card>);
    expect(screen.getByRole('heading', { name: /my card/i })).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <Card title="Test Card">
        <p>Some content</p>
      </Card>
    );
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });
});