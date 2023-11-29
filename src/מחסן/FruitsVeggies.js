import React from 'react';

const FruitsVeggies = ({ items, type }) => {
  return (
    <div>
      <h2 style={{ color: type === 'fruits' ? 'green' : 'brown' }}>
        {type === 'fruits' ? 'פירות כתומים' : 'ירקות כתומים'}
      </h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={type} style={{ color: type === 'fruits' ? 'green' : 'brown' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FruitsVeggies;
