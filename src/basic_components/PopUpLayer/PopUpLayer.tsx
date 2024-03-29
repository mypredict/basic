import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

const popUpLayerRoot = (() => {
  let popUpLayerRoot = document.getElementById('bs-pop-up-layer-root');
  if (popUpLayerRoot) {
    return popUpLayerRoot;
  }

  popUpLayerRoot = document.createElement('div');
  popUpLayerRoot.setAttribute('id', 'bs-pop-up-layer-root');
  document.body.appendChild(popUpLayerRoot);
  return popUpLayerRoot;
})();

interface Props {
  children: ReactElement;
}

function PopUpLayer(props: Props) {
  return ReactDOM.createPortal(props.children, popUpLayerRoot);
}

export default PopUpLayer;
