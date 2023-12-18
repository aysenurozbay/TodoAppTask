import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../helpers/colors';

interface IDoneIconProps {
  size: number;
  fill: string;
}

const DoneIcon = ({size, fill = colors.black, ...props}: IDoneIconProps) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill={fill} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m6.7 18l-5.65-5.65l1.425-1.4l4.25 4.25l1.4 1.4zm5.65 0L6.7 12.35l1.4-1.425l4.25 4.25l9.2-9.2l1.4 1.425zm0-5.65l-1.425-1.4L15.875 6L17.3 7.4z"
      />
    </Svg>
  );
};
export default DoneIcon;
