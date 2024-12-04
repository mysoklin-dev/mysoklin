import { CheckSquare, Square } from 'iconoir-react';
import React from 'react';

type TBaseCheckboxProps = {
  value: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label: string | React.ReactNode;
  className?: string;
};

const BaseCheckbox = (props: TBaseCheckboxProps) => {
  return (
    <div className={props.className}>
      <div className="flex items-start gap-1.5">
        <div className="checkbox relative text-blue">
          <input
            checked={props.value}
            onChange={props.onChange}
            type="checkbox"
            name="agreement"
            id="agreement"
            className="absolute z-10 h-6 w-6 cursor-pointer opacity-0"
          />
          <button className="relative z-0">
            {props.value ? (
              <CheckSquare className="" height={24} width={24} />
            ) : (
              <Square className="" height={24} width={24} />
            )}
          </button>
        </div>
        {props.label}
      </div>
      {props.error && <p className="text-red-500">{props.error}</p>}
    </div>
  );
};

export default BaseCheckbox;
