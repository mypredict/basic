import React, { useState, useEffect } from 'react';
import './Switch.css';

interface Props {
  defaultChecked: boolean;
  disabled: boolean;
  onChange: Function;
  children?: Object;
}

Switch.defaultProps = {
  defaultChecked: false,
  disabled: false,
  onChange: () => {}
};

function Switch(props: Props) {
  const { defaultChecked, onChange } = props;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  function handleChange() {
    setIsChecked(!isChecked);
    onChange(isChecked);
  }

  return (
    <button
      disabled={props.disabled}
      className={`
        switch-basic
        switch-basic-${isChecked ? 'on' : 'off'}
        ${props.disabled && 'switch-basic-disabled'}
      `}
      onClick={handleChange}
    >
      {props.children}
    </button>
  );
}

export default Switch;
