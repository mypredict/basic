import React, { useContext, useEffect } from 'react';
import { MessageContext } from './MessageContainer';
import './Message.css';

interface Props {
  itemConfig: any;
  item: any;
}

function Message(props: Props) {
  const { itemConfig, item } = props;
  const { basicConfig, list, dispatch } = useContext(MessageContext);

  useEffect(() => {
    console.log({ list, item });
    dispatch({
      type: 'add',
      data: {}
    });
  }, [item]);

  return (
    <div className="bs-message">
      {list.map((item, index: number) => (
        <div key={index} className="bs-message-item">
          <span>{item.content}</span>
        </div>
      ))}
    </div>
  );
}

export default Message;
