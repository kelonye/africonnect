import React from 'react';

const fmt = m =>
  (m || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// const fmt = m => `$${(m || 0).toFixed(2)}`;

export default ({ money, style = {} }) => (
  <span style={style}>{fmt(money / 100)}</span>
);
