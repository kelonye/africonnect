import React from 'react';

export default ({ money }) => <span>${(money / 100).toFixed(2)}</span>;
