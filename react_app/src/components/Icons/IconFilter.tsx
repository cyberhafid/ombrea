import { IIcon } from './icon.interface';

export const IconFilter = ({ height = 24, width = 24, className = '', style }: IIcon) => (
  <svg
    className={className}
    fill="none"
    height={height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    style={style}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);

