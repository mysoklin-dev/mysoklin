import type { InputHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

type TBaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const BaseInput = forwardRef<HTMLInputElement, TBaseInputProps>(
  (props, ref) => {
    return (
      <div className="flex flex-col">
        <input
          {...props}
          ref={ref}
          className="h-fit w-full rounded-lg bg-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {props.error && <p className="text-red-500">{props.error}</p>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
