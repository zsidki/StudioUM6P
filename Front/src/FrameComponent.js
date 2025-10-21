import React from 'react';

const FrameComponent = ({ signIn, propWidth }) => {
  return (
    <div className={`self-stretch flex flex-col items-start justify-start ${propWidth ? 'w-' + propWidth : ''}`}>
      <button className="self-stretch h-[60px] bg-red-600 rounded-21xl flex flex-row items-center justify-center px-4 py-2 box-border text-white text-6xl font-bold font-poppins">
        {signIn}
      </button>
    </div>
  );
};

export default FrameComponent;
