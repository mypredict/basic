import React, { createContext, Context } from 'react';
import './Radio.css';

const radioGroupContext = {
  disabled: false,
  value: '',
  onChange: () => {}
};
export const RadioGroupContext: Context<any> = createContext(radioGroupContext);

interface Props {
  disabled: boolean,
  value: string | number;
  onChange: Function;
  children?: Object;
}

RadioGroup.defaultProps = { ...radioGroupContext };

function RadioGroup(props: Props) {
  return (
    <RadioGroupContext.Provider
      value={{
        disabled: props.disabled,
        value: props.value,
        onChange: props.onChange
      }}
    >
      {props.children}
    </RadioGroupContext.Provider>
  );
}

export default RadioGroup;
