import Svg, { Path } from "react-native-svg";

export function MarkerIcon({ color = '#fff' }) {
  return (
    <Svg width={17} height={20}>
      <Path fill={color} d="M2.843 3.03a8 8 0 0 1 11.314 11.313L8.5 20l-5.657-5.657a8 8 0 0 1 0-11.313zM8.5 10.972a2.286 2.286 0 1 0 0-4.571 2.286 2.286 0 0 0 0 4.571z" />
    </Svg>
  )
}
