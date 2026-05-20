import { IIcon } from './icon.interface';

export const IconEmpty = ({ height = 24, width = 24 }: IIcon) => (
  <svg height={height} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg">
    <path
      d="m20 17.175l-2-2V4h-7.15l-2 2L7.4 4.6L10 2h8q.825 0 1.413.588T20 4v13.175Zm.5 6.125L6 8.8V20h12v-2.025l2 2V20q0 .825-.588 1.413T18 22H6q-.825 0-1.413-.588T4 20V8l.6-.6L.7 3.5l1.425-1.4L21.9 21.875L20.5 23.3Zm-6.975-12.625Zm-1.875 3.8Z"
      fill="currentColor"
    />
  </svg>
);