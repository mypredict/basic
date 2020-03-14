import React, { ReactElement, CSSProperties, useState, useRef, useCallback } from 'react';
import { Animation, PopUpLayer } from '../index';
import './Dialog.css';

import { AnimationType } from '../Animation/Animation';

export type CancelFn = () => void;
export type ConfirmPromiseFn = () => Promise<any> | void;

interface Props {
  rootStyle?: CSSProperties;
  visible: boolean;
  title?: string;
  cancelIcon?: boolean;
  cancelBtn?: boolean;
  confirmBtn?: boolean;
  cancelBtnText?: string;
  confirmBtnText?: string;
  confirmBtnAsync?: boolean;
  outsideClickCancel?: boolean;
  disabledConfirmBtn?: boolean;
  onCancel?: CancelFn;
  onConfirm?: ConfirmPromiseFn;
  animationType?: AnimationType;
  children?: ReactElement;
}

function Dialog(props: Props) {
  const {
    confirmBtnAsync,
    outsideClickCancel,
    onConfirm = () => {},
    onCancel = () => {}
  } = props;

  const confirmFnRef = useRef<ConfirmPromiseFn>(onConfirm);
  confirmFnRef.current = onConfirm;

  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = useCallback(async () => {
    if (confirmBtnAsync) {
      setIsLoading(true);
      await confirmFnRef.current();
      setIsLoading(false);
    } else {
      confirmFnRef.current();
    }
  }, [confirmBtnAsync]);

  const cancelFnRef = useRef<CancelFn>(onCancel);
  cancelFnRef.current = onCancel;

  const handleOutsideClick = useCallback(() => {
    if (outsideClickCancel) {
      cancelFnRef.current();
    }
  }, [outsideClickCancel]);

  return (
    <PopUpLayer>
      <Animation display={props.visible} type={props.animationType}>
        <div
          className={`bs-dialog-wrap bs-dialog-wrap-${props.visible ? 'show' : 'hide'}`}
          onClick={handleOutsideClick}
        >
          <div
            className="bs-dialog"
            onClick={e => e.stopPropagation()}
            style={props.rootStyle}
          >
            {(props.title || props.cancelIcon) && (
              <header className="bs-dialog-header">
                <h2 className="bs-dialog-title">{props.title}</h2>
                <button onClick={props.onCancel}>x</button>
              </header>
            )}
            {props.children}
            {(props.cancelBtn || props.confirmBtn) && (
              <footer className="bs-dialog-footer">
                {props.cancelBtn && (
                  <button onClick={props.onCancel}>{props.cancelBtnText}</button>
                )}
                {props.confirmBtn && (
                  <button
                    disabled={props.disabledConfirmBtn || isLoading}
                    onClick={handleConfirm}
                  >
                    {props.confirmBtnText}
                  </button>
                )}
              </footer>
            )}
          </div>
        </div>
      </Animation>
    </PopUpLayer>
  );
}

Dialog.defaultProps = {
  rootStyle: {},
  visible: false,
  title: '',
  cancelIcon: true,
  cancelBtn: true,
  confirmBtn: true,
  cancelBtnText: '取消',
  confirmBtnText: '确定',
  confirmBtnLoading: false,
  outsideClickCancel: false,
  disabledConfirmBtn: false
};

export default Dialog;
