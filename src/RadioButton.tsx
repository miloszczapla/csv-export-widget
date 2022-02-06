import React from 'react';

type RadioButtonProps = {
  label: string;
  radioValue: string;
  name: string;
  onChange?: (radioValue: string) => void;
  required?: boolean;
};

export default function RadioButton({
  label,
  radioValue,
  name,
  onChange,
  required,
}: RadioButtonProps) {
  return (
    <div className='space-x-1'>
      <input
        className='cursor-pointer'
        type='radio'
        name={name}
        value={radioValue}
        id={`${radioValue}-radio`}
        onClick={() => onChange?.(radioValue)}
        required
      />
      <label className='cursor-pointer ' htmlFor={`${radioValue}-radio`}>
        {label}
      </label>
    </div>
  );
}
