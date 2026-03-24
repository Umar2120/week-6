import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form - Interaction Testing', () => {
  test('renders form with all input fields', () => {
    render(<Form />);
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  test('updates name input when user types', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const nameInput = screen.getByTestId('name-input');
    
    await user.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  });

  test('updates email input when user types', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const emailInput = screen.getByTestId('email-input');
    
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
  });

  test('updates password input when user types', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const passwordInput = screen.getByTestId('password-input');
    
    await user.type(passwordInput, 'securePassword123');
    expect(passwordInput).toHaveValue('securePassword123');
  });

  test('updates all form fields simultaneously', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    
    await user.type(nameInput, 'Jane Smith');
    await user.type(emailInput, 'jane@example.com');
    await user.type(passwordInput, 'password456');
    
    expect(nameInput).toHaveValue('Jane Smith');
    expect(emailInput).toHaveValue('jane@example.com');
    expect(passwordInput).toHaveValue('password456');
  });

  test('clears input field when backspacing', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const nameInput = screen.getByTestId('name-input');
    
    await user.type(nameInput, 'Test');
    expect(nameInput).toHaveValue('Test');
    
    await user.clear(nameInput);
    expect(nameInput).toHaveValue('');
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Form onSubmit={handleSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('submit-btn');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    
    await user.click(submitBtn);
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });

  test('displays success message after form submission', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('submit-btn');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitBtn);
    
    expect(screen.getByTestId('success-message')).toHaveTextContent('Form submitted successfully!');
  });

  test('does not show success message before submission', () => {
    render(<Form />);
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
  });

  test('allows user to correct typos in fields', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const nameInput = screen.getByTestId('name-input');
    
    await user.type(nameInput, 'Jane Smth');
    expect(nameInput).toHaveValue('Jane Smth');
    
    // Clear and retype to fix typo
    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Smith');
    
    expect(nameInput).toHaveValue('Jane Smith');
  });
});