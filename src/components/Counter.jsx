import React, { useState } from 'react';

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return (
    <div>
      <p data-testid="count-display">Count: {count}</p>
      <button onClick={increment} data-testid="increment-btn">
        Increment
      </button>
      <button onClick={decrement} data-testid="decrement-btn">
        Decrement
      </button>
      <button onClick={reset} data-testid="reset-btn">
        Reset
      </button>
    </div>
  );
};

export default Counter;