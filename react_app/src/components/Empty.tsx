import { IconEmpty } from './Icons/IconEmpty';

import './Empty.scss';

export interface IEmptyProps {
  title: string;
  message: string;
  height?: number;
  iconSize?: number;
  alone?: boolean;
  small?: boolean;
}

export const EmptyOb = ({ title, message, height = 250, iconSize = 80, alone = false, small = false }: IEmptyProps) => (
  <div className={`empty flex items-center justify-center px-1 ${alone ? " empty--alone" : ""}`} style={{ height }}>
    <div>
      <div className="empty__icon flex justify-center">
        <IconEmpty height={iconSize} width={iconSize} />
      </div>
      <div className={`empty__title flex justify-center my-1 ${small ? ' empty__title--small' : ''}`}>{title}</div>
      <div className={`empty__message flex justify-center ${small ? 'empty__message--small' : ''}`}>{message}</div>
    </div>
  </div>
);

