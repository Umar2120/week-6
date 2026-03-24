import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter - Interaction Testing', () => {
  test('renders counter display with initial value', () => {
    render(<Counter initialValue={0} />);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 0');
  });

  test('increments count when Increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    
    await user.click(incrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');
  });

  test('increments count multiple times', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 3');
  });

  test('decrements count when Decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    const decrementBtn = screen.getByTestId('decrement-btn');
    
    await user.click(decrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 4');
  });

  test('decrements to negative numbers', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);
    
    const decrementBtn = screen.getByTestId('decrement-btn');
    
    await user.click(decrementBtn);
    await user.click(decrementBtn);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: -2');
  });

  test('resets count to initial value', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={10} />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    const resetBtn = screen.getByTestId('reset-btn');
    
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 12');
    
    await user.click(resetBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 10');
  });

  test('handles mixed increment and decrement operations', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    const decrementBtn = screen.getByTestId('decrement-btn');
    
    await user.click(incrementBtn);
    await user.click(decrementBtn);
    await user.click(incrementBtn);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 6');
  });
});