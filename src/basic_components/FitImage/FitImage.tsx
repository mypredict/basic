import React from 'react';

/*
  cover: 不失真, 填充满内容框, 隐藏掉了一部分内容
  fill: 失真, 填充满内容框, 展示所有内容
  contain: 不失真, 按比例填充内容框, 展示所有内容
  none: 不失真, 保持图片原有尺寸
  scale-down: 取 contain 和 none 中尺寸较小的一个
*/

interface Props {
  src: string;
  objectFit?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down';
  objectPosition?: string;
  alt?: string;
  style?: object;
}

FitImage.defaultProps = {
  objectFit: 'cover',
  objectPosition: 'center',
  alt: '',
};

function FitImage(props: Props) {
  return (
    <img
      className="auto-fit-img-page"
      style={{
        width: '100%',
        height: '100%',
        objectFit: props.objectFit,
        objectPosition: props.objectPosition,
        ...props.style
      }}
      src={props.src}
      alt={props.alt}
    />
  );
}

export default FitImage;
