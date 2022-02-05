import React from 'react';

type RadioButtonProps = {
  label: string;
  value: string;
  name: string;
  onChange?: (value: string) => void;
};

export default function RadioButton({
  label,
  value,
  name,
  onChange,
}: RadioButtonProps) {
  return (
    <div className='space-x-1'>
      <input
        className='cursor-pointer'
        type='radio'
        name={name}
        value={value}
        id={`${value}-radio`}
        onClick={() => onChange?.(value)}
      />
      <label className='cursor-pointer ' htmlFor={`${value}-radio`}>
        {label}
      </label>
    </div>
  );
}
