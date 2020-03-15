import React, {
  ReactElement,
  CSSProperties,
  AnimationEvent,
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';
import './Animation.css';

export type AnimationType = 'fade' | 'scale';

export type AnimationTimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | string;
export type AnimationIterationCount = number | 'infinite';
export type AnimationFillMode =
  | 'none'
  | 'forwards'
  | 'backwards'
  | 'both'
  | 'initial'
  | 'inherit';
export type AnimationDirection =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse'
  | 'initial'
  | 'inherit';
export type AnimationPlayState = 'paused' | 'running';

export type AnimationFn = (event: AnimationEvent<HTMLDivElement>) => void;

interface Props {
  display?: boolean;
  type?: AnimationType;
  rootStyle?: CSSProperties;
  className?: string;
  animationDuration?: string;
  animationTimingFunction?: AnimationTimingFunction;
  animationDelay?: string;
  animationIterationCount?: AnimationIterationCount;
  animationDirection?: AnimationDirection;
  animationFillMode?: AnimationFillMode;
  animationPlayState?: AnimationPlayState;
  onAnimationStart?: AnimationFn;
  onAnimationIteration?: AnimationFn;
  onAnimationEnd?: AnimationFn;
  children?: ReactElement;
}

function Animation(props: Props) {
  const { display } = props;

  // show 控制子元素的显隐
  const [showChildren, setShowChildren] = useState(props.display);

  // 从无到有立刻显示show
  useEffect(() => {
    display && setShowChildren(true);
  }, [display]);

  // 从有到无等动画执行结束后再执行
  const onAnimationEndRef = useRef<AnimationFn>();
  onAnimationEndRef.current = props.onAnimationEnd;
  const handleAnimationEnd = useCallback(
    e => {
      !display && setShowChildren(false);
      onAnimationEndRef.current && onAnimationEndRef.current(e);
    },
    [display]
  );

  return (
    <div
      className={`
        bs-animation
        bs-animation-${props.type}-${props.display ? 'show' : 'hide'}
        ${props.className}
      `}
      style={{
        ...props.rootStyle,
        animationDuration: props.animationDuration,
        animationTimingFunction: props.animationTimingFunction,
        animationDelay: props.animationDelay,
        animationIterationCount: props.animationIterationCount,
        animationDirection: props.animationDirection,
        animationFillMode: props.animationFillMode,
        animationPlayState: props.animationPlayState
      }}
      onAnimationStart={props.onAnimationStart}
      onAnimationIteration={props.onAnimationIteration}
      onAnimationEnd={handleAnimationEnd}
    >
      {showChildren && props.children}
    </div>
  );
}

Animation.defaultProps = {
  display: true,
  type: 'fade',
  rootStyle: {},
  className: ''
};

export default Animation;
