import React, { useState, useEffect, useMemo } from 'react';
import { useRequest, useCopy, usePagination, useVirtualized } from './custom_hooks/index';
import { Switch, Radio, Dialog, message } from './basic_components/index';
import './App.css';

const mockData = [
  {
    time: 20180625,
    tasks: []
  },
  {
    time: 20180626,
    tasks: [
      { 'name': '咨询&建议', time: '1300' },
      { 'name': '自定义任务', time: '1300' }
    ]
  },
  {
    time: 20180627,
    tasks: []
  },
  {
    time: 20180628,
    tasks: [
      { 'name': '...', time: '1300' },
      { 'name': '随访任务', time: '1400' },
      { 'name': '投诉任务', time: '1500' },
      { 'name': '预约任务', time: '1600' }
    ]
  },
  {
    time: 20180629,
    tasks: []
  },
  {
    time: 20180630,
    tasks: [
      { 'name': '投诉任务', time: '1300' }
    ]
  },
  {
    time: 20180701,
    tasks: []
  }
]

message.info();

const items = Array.from(Array(20000)).map((_, index) => {
  return {
    id: index,
    name: 'fhjd',
    age: index + 5,
    job: 123 * index
  };
});

const computeIndexHeight = (index: number) => {
  return index % 3 === 0 ? 25 : 50;
};

const App: React.FC = () => {
  const { data } = useRequest('/api1');
  const [value, setValue] = useState(3);

  const { startIndex, endIndex, countPage } = usePagination({
    total: 96,
    rowsPerPage: 5,
    currentPage: 13
  });

  const { list, containerProps, wrapperProps, isScrolling } = useVirtualized(items, {
    itemHeight: computeIndexHeight
  });

  const copy = useCopy();
  function handleChangeRadio(e: any) {
    setVisible(true);
    copy(123);
    setValue(e.target.value);
  }

  const [visible, setVisible] = useState(false);

  function handleConfirm() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setVisible(false);
      }, 2000);
    });
  }

  // console.log({ data, startIndex, endIndex, countPage });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const fillItemNumber = useMemo(() => {
    const { width } = windowSize;
    if (width < 150 * 7) {
      return 6;
    }
    return 0;
  }, [windowSize]);

  return (
    <div className="App">
      <ul className="list-container">
        {mockData.map(({ time, tasks }) => (
          <li className="list-item" key={time}>
            {tasks.map(({ name, time: taskTime }) => (
              <div key={taskTime}>{name}</div>
            ))}
          </li>
        ))}
        {Array(fillItemNumber).fill('').map((fillContent, fillIndex) => (
          <li className="fill-item" key={fillIndex}>{fillContent}</li>
        ))}
      </ul>
      <Switch>nihao</Switch>
      <Radio.Group value={value} onChange={handleChangeRadio}>
        <Radio value={1} />
        <Radio value={2} />
        <Radio value={3} />
      </Radio.Group>

      <Dialog
        title="发动机山卡拉富家大室发动机是离开"
        animationType="scale_fade"
        outsideClickCancel={true}
        visible={visible}
        confirmBtnAsync={true}
        onCancel={() => setVisible(false)}
        onConfirm={handleConfirm}
      >
        <p style={{ width: '30rem', height: '10rem', margin: 0, background: '#eee' }}>
          123
        </p>
      </Dialog>

      <div
        {...containerProps}
        style={{
          width: '300px',
          height: '400px',
          margin: '0 auto',
          overflow: 'auto',
          background: '#eee'
        }}
      >
        <div {...wrapperProps}>
          {list.map(item => (
            <div style={{ height: computeIndexHeight(item.id) }} key={item.id}>
              编号: {item.id}
            </div>
          ))}
          {/* {isScrolling
            ? list.map(item => (
                <div style={{ height: '50px' }} key={item.id}>
                  nihao: {item.id}
                </div>
              ))
            : list.map(item => (
                <div style={{ height: '50px' }} key={item.id}>
                  编号: {item.id}
                </div>
              ))} */}
        </div>
      </div>
    </div>
  );
};

export default App;
