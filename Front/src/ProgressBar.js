import React from 'react';

export function ProgressBar({ step }) {
  const steps = [
    { number: 1, label: 'Select Service' },
    { number: 2, label: 'Personal Info' },
    { number: 3, label: 'Review & Confirm' },
  ];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((item, index) => (
        <React.Fragment key={item.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold text-lg ${
                step >= item.number ? 'bg-custom-red' : 'bg-gray-300'
              }`}
            >
              {item.number}
            </div>
            <div className="text-center text-md mt-2">
              <span className={`${
                step >= item.number ? 'text-custom-red font-semibold' : 'text-gray-500 font-medium'
              }`}>
                {item.label}
              </span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-2 mx-3 ${step > item.number ? 'bg-custom-red' : 'bg-gray-300'} rounded-full`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
