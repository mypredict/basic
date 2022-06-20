import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

type Icon = String | ReactElement;

interface MessageConfig {
  key?: String;
  animationType: 'fade';
  addType: 'push' | 'pop';
  position: 'topRight';
  maxCount: number;
  duration: number;
  icon?: Icon;
  infoIcon?: Icon;
  successIcon?: Icon;
  warningIcon?: Icon;
  errorIcon?: Icon;
  loadingIcon?: Icon;
}

interface MessageInfo {
  key?: String;
  icon?: String | ReactElement;
  content?: string;
}

const bsMessageRoot = (() => {
  let bsMessageRoot = document.getElementById('bs-message');
  if (bsMessageRoot) {
    return bsMessageRoot;
  }

  bsMessageRoot = document.createElement('div');
  bsMessageRoot.setAttribute('id', 'bs-message-root');
  document.body.appendChild(bsMessageRoot);
  return bsMessageRoot;
})();

const message = (() => {
  const config = () => {
    render();
  };

  const info = () => {
    render();
  };

  const success = () => {
    render();
  };

  const warning = () => {
    render();
  };

  const error = () => {
    render();
  };

  const loading = () => {
    render();
  };

  const destroy = () => {
    render();
  };

  const clear = () => {
    render();
  };

  const render = () => {
    ReactDOM.render(
      <Message itemConfig={{ content: '123' }} item={{ content: '123' }} />,
      bsMessageRoot
    );
  };

  return {
    config,
    info,
    success,
    warning,
    error,
    loading,
    destroy,
    clear
  };
})();

export default message;
