import Svg, { Path } from 'react-native-svg';
import { Animated, Easing, Pressable } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';

export function SwitchArrowIcon({ color = '#fff', onPress }) {
  const [spinRight, setSpinRight] = useState(false);
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const rotateRight = async () => {
    Animated.timing(
      spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0, 1),
      useNativeDriver: true,
    }
    ).start();
  }

  const rotateLeft = async () => {
    Animated.timing(
      spinValue, {
      toValue: -1,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0, 1),
      useNativeDriver: true
    }
    ).start();
  }

  const rotate = () => {
    spinRight ? rotateRight() : rotateLeft();
  }

  useEffect(() => {
    rotate();
  }, [spinRight]);

  return (
    <Pressable 
      onPress={() => {
        setSpinRight(!spinRight);
        onPress();
      }} 
      style={{ padding: 10, paddingRight: 0 }}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={17} height={16} fill="none">
          <Path fill={color} d="M3.18 10.128a1.064 1.064 0 0 0 2.128 0V4.184L6.684 5.56a1.064 1.064 0 0 0 1.504-1.505L4.996.863a1.064 1.064 0 0 0-1.505 0L.3 4.055A1.064 1.064 0 0 0 1.803 5.56L3.18 4.184v5.944zm10.64-4.256a1.064 1.064 0 1 0-2.128 0v5.944l-1.376-1.376a1.064 1.064 0 0 0-1.504 1.505l3.192 3.192a1.064 1.064 0 0 0 1.505 0l3.192-3.192a1.064 1.064 0 0 0-1.504-1.505l-1.376 1.376V5.872z" />
        </Svg>
      </Animated.View>
    </Pressable>
  );
}
