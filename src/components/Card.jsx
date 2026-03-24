import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;