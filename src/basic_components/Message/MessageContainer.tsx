import React, {
  ReactElement,
  Dispatch,
  Context,
  Reducer,
  createContext,
  useReducer,
  useState,
  useEffect
} from 'react';

type Position =
  | 'topCenter'
  | 'topRight'
  | 'topLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'bottomLeft';
type AnimationType =
  | 'leftToRight'
  | 'rightToLeft'
  | 'topToBottom'
  | 'bottomToTop'
  | 'scale';
type addType = 'push' | 'unshift';
type Icon = string | ReactElement;

interface BasicConfig {
  position: Position;
  animationType: AnimationType;
  addType: addType;
  maxCount: number;
  duration: number;
  infoIcon: Icon;
  successIcon: Icon;
  warningIcon: Icon;
  errorIcon: Icon;
  loadingIcon: Icon;
}

interface ItemConfig {
  key?: string;
  icon?: Icon;
  duration?: number;
  content: string;
}

interface Action {
  type: 'config' | 'add' | 'destroy' | 'clear';
  data: {};
}

interface State {
  basicConfig: BasicConfig;
  list: Array<ItemConfig>;
  dispatch: Dispatch<Action>;
}

const messageContext: State = {
  basicConfig: {
    position: 'topCenter',
    animationType: 'rightToLeft',
    addType: 'unshift',
    maxCount: 3,
    duration: 2000,
    infoIcon: 'info',
    successIcon: 'success',
    warningIcon: 'warning',
    errorIcon: 'error',
    loadingIcon: 'loading'
  },
  list: [],
  dispatch: () => {}
};
export const MessageContext: Context<State> = createContext(messageContext);

function reducer(state: State, action: Action) {
  console.log(action);
  switch (action.type) {
    case 'config':
      return state;
    case 'add':
      return { ...state, list: [...state.list, { content: '345' }] };
    case 'destroy':
      return state;
    case 'clear':
      return state;
    default:
      return state;
  }
}

interface Props {
  children?: Object;
}

function MessageContainer(props: Props) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, messageContext);
  const [providerContext, setProviderContext] = useState({
    basicConfig: state.basicConfig,
    list: state.list,
    dispatch
  });

  return (
    <MessageContext.Provider
      value={{ basicConfig: state.basicConfig, list: state.list, dispatch }}
    >
      123
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContainer;
