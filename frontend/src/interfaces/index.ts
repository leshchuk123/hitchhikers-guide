import { CSSProperties } from 'react';

export interface IStylable {
  className?: string;
  style?: CSSProperties;
}

export type FlexCommon = "inherit" | "initial" | "unset";
export type FlexAlign = "center" | "stretch" | "baseline" |
  "flex-start" | "flex-end";
export type FlexJustify = "start" | "end" | "left" | "right" | 
  "space-between" | "space-around" | "space-evenly" |
  "safe" | "unsafe";
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

export interface IContainer {
  flex?: boolean;
  align?: FlexAlign | FlexCommon;
  justify?: FlexJustify | FlexAlign | FlexCommon;
  direction?: FlexDirection | FlexCommon;
}
