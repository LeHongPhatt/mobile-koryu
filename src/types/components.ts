import {ReactNode} from 'react';
import {IFileAttach} from './contract';

export type TmodeContent = 'light-content' | 'dark-content' | 'default';
export interface ITimeLineProps {
  data?: [];
}

export interface IBannerADV {
  data?: IBannerADVItem[];
  children?: ReactNode;
}

export interface IBannerADVItem {
  title?: string;
  content?: string;
  detail?: string;
}

export interface IImageViewerProps {
  children?: ReactNode;
  style?: any;
  visible?: boolean;
  data?: any;
  isDocumentCode?: boolean;
  isCustom?: boolean;
  seletedItem?: any;
  projectname?: string;
}

export interface ISwiperProps {
  images?: [];
  visible: boolean;
  toggleModal?: () => void;
}

export interface IListItemProps {
  screenType?: string;
  item?: any;
  pinType?: string;
}

export interface INotiComponent {
  list?: [];
  isAll: boolean;
}

export interface IFileAttachProps {
  file: IFileAttach;
  isDelete?: boolean;
}
export interface ITimer {
  timer: number;
  startTimer: (time: number) => void;
  stopTimer: () => void;
}

export interface ICountDownProps {
  start?: number;
  fps?: number;
}
