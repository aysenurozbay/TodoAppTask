import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../colors';

interface IPlusIconProps {
  size: number;
  fill: string;
}

const PlusIcon = ({size, fill = colors.black, ...props}: IPlusIconProps) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill={fill} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
      />
    </Svg>
  );
};
export default PlusIcon;
