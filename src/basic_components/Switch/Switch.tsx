import React, { useState, useEffect } from 'react';
import './Switch.css';
import '../index.css';

interface Props {
  width: 'string';
  height: 'string';
  defaultChecked: boolean;
  disabled: boolean;
  onChange: Function;
  children?: Object;
}

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
      className={`
        bs-switch
        bs-switch-${isChecked ? 'on' : 'off'}
        ${props.disabled ? 'switch-basic-disabled' : ''}
      `}
      style={{
        width: props.width,
        height: props.height
      }}
      data-width={props.width}
      data-height={props.height}
      data-color="red"
      disabled={props.disabled}
      onClick={handleChange}
    >
      {props.children}
    </button>
  );
}

Switch.defaultProps = {
  width: '4rem',
  height: '2rem',
  defaultChecked: false,
  disabled: false,
  onChange: () => {}
};

export default Switch;
