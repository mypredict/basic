import React, { useState, useRef, useCallback } from 'react';
import PopUpLayer from '../PopUpLayer/PopUpLayer';
import './Dialog.css';

export type CancelFn = () => void;
export type ConfirmPromiseFn = () => Promise<any> | void;

interface Props {
  visible: boolean;
  title?: string;
  cancelIcon?: boolean;
  cancelBtn?: boolean;
  confirmBtn?: boolean;
  cancelBtnText?: string;
  confirmBtnText?: string;
  confirmBtnLoading?: boolean;
  outsideClickCancel?: boolean;
  disabledConfirmBtn?: boolean;
  onCancel?: CancelFn;
  onConfirm?: ConfirmPromiseFn;
  children?: Object;
}

function Dialog(props: Props) {
  const {
    confirmBtnLoading,
    outsideClickCancel,
    onConfirm = () => {},
    onCancel = () => {}
  } = props;

  const confirmFnRef = useRef<ConfirmPromiseFn>(onConfirm);
  confirmFnRef.current = onConfirm;

  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = useCallback(async () => {
    if (confirmBtnLoading) {
      setIsLoading(true);
      await confirmFnRef.current();
      setIsLoading(false);
    } else {
      confirmFnRef.current();
    }
  }, [confirmBtnLoading]);

  const cancelFnRef = useRef<CancelFn>(onCancel);
  cancelFnRef.current = onCancel;

  const handleOutsideClick = useCallback(() => {
    if (outsideClickCancel) {
      cancelFnRef.current();
    }
  }, [outsideClickCancel]);

  return (
    <PopUpLayer>
      {props.visible ? (
        <div className="bs-dialog-wrap" onClick={handleOutsideClick}>
          <div className="bs-dialog" onClick={e => e.stopPropagation()}>
            {(props.title || props.cancelIcon) && (
              <header className="bs-dialog-header">
                <h2>{props.title}</h2>
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
      ) : (
        <></>
      )}
    </PopUpLayer>
  );
}

Dialog.defaultProps = {
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
