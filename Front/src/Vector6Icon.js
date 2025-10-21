import React, { memo } from 'react';

const Vector6Icon = (props) => (
  <svg preserveAspectRatio='none' viewBox='0 0 145 144' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 144V0H145V144H0Z' fill='#D4451E' />
  </svg>
);

const Memo = memo(Vector6Icon);
export { Memo as Vector6Icon };
