import { IconType } from "react-icons";

import {
  HiOutlineArrowDownTray,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineDocumentDuplicate,
  HiOutlineHome,
  HiOutlineLightBulb,
  HiOutlinePaintBrush,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePencil,
  HiOutlinePhoto,
  HiOutlineRocketLaunch,
  HiOutlineShoppingCart,
  HiOutlineStop,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import {
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaDiscord,
  FaThreads,
} from "react-icons/fa6";
import { HiOutlineCode, HiOutlineGlobe, HiOutlineMail, HiOutlineTrendingDown, HiOutlineTrendingUp, HiOutlineViewGrid } from "react-icons/hi";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  github: FaGithub,
  google: FaGoogle,
  linkedin: FaLinkedin,
  discord: FaDiscord,
  threads: FaThreads,
  edit: HiOutlinePencil,
  settings: HiOutlineCog6Tooth,
  logout: HiOutlineArrowRightOnRectangle,
  book: HiOutlineBookOpen,
  trendUp: HiOutlineTrendingUp,
  trendDown: HiOutlineTrendingDown,
  email: HiOutlineMail,
  document: HiOutlineDocumentDuplicate,
  home: HiOutlineHome,
  code: HiOutlineCode,
  pages: HiOutlineDocumentDuplicate,
  trend: HiOutlineTrendingUp,
  chat: HiOutlineChatBubbleLeftRight,
  style: HiOutlinePaintBrush,
  people: HiOutlineUserGroup,
  shop: HiOutlineShoppingCart,
  lightbulb: HiOutlineLightBulb,
  globe: HiOutlineGlobe,
  apps: HiOutlineViewGrid,
  download: HiOutlineArrowDownTray,
  send: HiOutlinePaperAirplane,
  image: HiOutlinePhoto,
  stop: HiOutlineStop,
  attach: HiOutlinePaperClip,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;