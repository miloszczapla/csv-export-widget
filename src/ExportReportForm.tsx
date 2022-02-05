import React, { useState } from 'react';
import RadioButton from './RadioButton';

const formatRadioOptions = [
  {
    label: 'Excel',
    value: 'excel',
  },
  {
    label: 'CSV',
    value: 'csv',
  },
];
const scheduleRadioOptions = [
  {
    label: 'No reapeat',
    value: 'no-repeat',
  },
  {
    label: 'Specific',
    value: 'specific',
  },
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Weekly',
    value: 'weekly',
  },
];

const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export default function ExportReportForm() {
  const [isSpecificDate, setIsSpecificDate] = useState(false);
  const [isDaily, setIsDaily] = useState(false);
  const [isHourInput, setisHourInput] = useState(false);

  async function onFormSubmit(form: React.FormEvent<HTMLFormElement>) {
    form.preventDefault();

    const formData = new FormData(form.currentTarget);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }

  function resetForm() {
    const form = document.getElementById(
      'export-report-form'
    ) as HTMLFormElement;
    form.reset();
  }

  function onScheduleChange(schedule: string) {
    switch (schedule) {
      case 'no-repeat':
        setIsDaily(false);
        setIsSpecificDate(false);
        setisHourInput(false);
        break;
      case 'daily':
        setIsDaily(false);
        setIsSpecificDate(false);
        setisHourInput(true);
        break;
      case 'specific':
        setIsDaily(false);
        setIsSpecificDate(true);
        setisHourInput(true);
        break;
      case 'weekly':
        setIsDaily(true);
        setIsSpecificDate(false);
        setisHourInput(true);
        break;

      default:
        break;
    }
  }

  return (
    <div className='rounded-md shadow-lg text-xs'>
      <div className='p-4 bg-gray-200'>
        <h5>Export Report</h5>
      </div>
      <form action='' onSubmit={onFormSubmit} id='export-report-form'>
        <div className='form-grid px-5 py-4'>
          <p className='flex items-center'>Report name</p>
          <input
            name='report-name'
            className='form-input'
            type='text'
            placeholder='Shareablee Report'
            required
          />
          <p className='flex items-center'>Format</p>
          <div className='flex items-center space-x-4'>
            {formatRadioOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                value={option.value}
                name='format'
              />
            ))}
          </div>
          <p className='flex items-center'>E-mail to</p>
          <input
            name='email-address'
            className='form-input'
            type='mail'
            placeholder='client@company.com'
            required
          />
          <p className='flex items-center'>Schedule</p>
          <div className='flex items-center space-x-4'>
            {scheduleRadioOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                value={option.value}
                name='schedule'
                onChange={onScheduleChange}
              />
            ))}
          </div>
          <p className='flex items-center'>Every</p>
          <div className='flex items-center space-x-4 h-9'>
            {isDaily && (
              <select name='weekday' id='' className='form-input capitalize'>
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            )}
            {isSpecificDate && (
              <input
                type='date'
                name='specific-date'
                className='form-input'
                required
              />
            )}

            {(isSpecificDate || isDaily) && isHourInput && (
              <p className='flex items-center'>at</p>
            )}
            {isHourInput && (
              <input
                name='hour'
                className='form-input'
                type='time'
                placeholder='13:00'
                required
              />
            )}
          </div>
        </div>

        <div className='border-t-2 border-gray-300 flex justify-end space-x-5 p-5'>
          <button
            type='button'
            className='form-button 
        '
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='form-button bg-gray-600 text-gray-200'
          >
            OK
          </button>
        </div>
      </form>
    </div>
  );
}
