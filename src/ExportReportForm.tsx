import React, { useState } from 'react';
import RadioButton from './RadioButton';

const POST_URL = 'https://httpbin.org/anything';

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

type RestructuredFormData = {
  [key: string]: any;
};

export default function ExportReportForm() {
  const [isSpecificDate, setIsSpecificDate] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);
  const [isHourInput, setisHourInput] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  async function onFormSubmit(form: React.FormEvent<HTMLFormElement>) {
    form.preventDefault();

    const formData = new FormData(form.currentTarget);

    const restructuredFormData: RestructuredFormData = {};

    formData.forEach((value, key) => {
      restructuredFormData[key as string] = value;
    });

    console.log(JSON.stringify(restructuredFormData));

    const response = await fetch(POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restructuredFormData),
    });
    setIsRequestSuccess(response.status === 200);
  }

  function resetForm() {
    const form = document.getElementById(
      'export-report-form'
    ) as HTMLFormElement;
    form.reset();
    onScheduleChange('no-repeat');
  }

  function onScheduleChange(schedule: string) {
    switch (schedule) {
      case 'no-repeat':
        setIsWeekly(false);
        setIsSpecificDate(false);
        setisHourInput(false);
        break;
      case 'daily':
        setIsWeekly(false);
        setIsSpecificDate(false);
        setisHourInput(true);
        break;
      case 'specific':
        setIsWeekly(false);
        setIsSpecificDate(true);
        setisHourInput(true);
        break;
      case 'weekly':
        setIsWeekly(true);
        setIsSpecificDate(false);
        setisHourInput(true);
        break;

      default:
        setIsWeekly(false);
        setIsSpecificDate(false);
        setisHourInput(false);
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
                radioValue={option.value}
                name='format'
              />
            ))}
          </div>
          <p className='flex items-center'>E-mail to</p>
          <input
            name='email-address'
            className='form-input'
            type='email'
            placeholder='client@company.com'
            required
          />
          <p className='flex items-center'>Schedule</p>
          <div className='flex items-center space-x-4'>
            {scheduleRadioOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                radioValue={option.value}
                name='schedule'
                onChange={onScheduleChange}
              />
            ))}
          </div>
          <p className='flex items-center'>
            {isSpecificDate && 'Date'}
            {isWeekly && 'Every'}
            {isHourInput && !isSpecificDate && !isWeekly && 'Everyday at'}
          </p>
          <div className='flex items-center space-x-4 h-9'>
            {isWeekly && (
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

            {(isSpecificDate || isWeekly) && isHourInput && (
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
      {isRequestSuccess && (
        <p className='pb-3 px-3 text-base text-center'>
          Report has been successfully exported.
        </p>
      )}
    </div>
  );
}
