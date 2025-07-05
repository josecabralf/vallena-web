import * as AntIcons from '@ant-design/icons';
import { FaBeer, FaHeart } from 'react-icons/fa';
import { LucideRocket } from 'lucide-react';

export const ICON_REGISTRY = {
  // Ant Design
  home: AntIcons.HomeOutlined,
  user: AntIcons.UserOutlined,
  setting: AntIcons.SettingOutlined,
  infoCircle: AntIcons.InfoCircleOutlined,
  eyeInvisible: AntIcons.EyeInvisibleOutlined,
  lock: AntIcons.LockOutlined,
  eyeTwoTone: AntIcons.EyeTwoTone,

  // React Icons (FontAwesome)
  beer: FaBeer,
  heart: FaHeart,

  // Lucide
  rocket: LucideRocket,
};
