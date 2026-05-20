import { HTMLAttributes } from 'react';

export interface IIcon extends HTMLAttributes<HTMLOrSVGElement> {
  height?: number;
  width?: number;
}
