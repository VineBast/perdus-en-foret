import Svg, { Circle } from "react-native-svg";

export function CircleIcon({ color = '#fff' }) {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill='none'>
      <Circle cx={8.5} cy={8} r={6.5} strokeWidth='3' stroke={color} />
    </Svg>
  )
}
