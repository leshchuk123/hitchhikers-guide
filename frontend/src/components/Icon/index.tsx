import React, { CSSProperties, FC } from 'react';
import { iconsMap } from './icons';

export interface IIcon {
  readonly name: string;
  size?: number;
  color?: string;
}
const Icon: FC<IIcon> = (props) => {
  const { name, size, color } = props;
  const IconComponent = name in iconsMap ? iconsMap[name] : iconsMap.default;

  const css: CSSProperties = {};
  if (size !== undefined) {
    css.width = `${size}px`;
    css.height = `${size}px`;
  }
  if (color !== undefined) {
    css.color = color;
  }

  return <IconComponent style={css} />;
};

export default Icon;
