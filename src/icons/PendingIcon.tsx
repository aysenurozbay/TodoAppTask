import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../helpers/colors';

interface IPendingIconProps {
  size: number;
  fill: string;
}

const PendingIcon = ({
  size,
  fill = colors.black,
  ...props
}: IPendingIconProps) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill={fill} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 22q-2.075 0-3.537-1.463T12 17q0-2.075 1.463-3.537T17 12q2.075 0 3.538 1.463T22 17q0 2.075-1.463 3.538T17 22m1.675-2.625l.7-.7L17.5 16.8V14h-1v3.2zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v6.25q-.45-.325-.95-.55T19 10.3V5h-2v3H7V5H5v14h5.3q.175.55.4 1.05t.55.95zm7-16q.425 0 .713-.288T13 4q0-.425-.288-.712T12 3q-.425 0-.712.288T11 4q0 .425.288.713T12 5"
      />
    </Svg>
  );
};
export default PendingIcon;
