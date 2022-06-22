import { View, Dimensions } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { position } from '../../core/theme';

const window = Dimensions.get("window");

export function TopIndicator() {
  return (
    <View style={{ width: 160, height: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 50, marginVertical: 16 }}></View>
  )
}

export function Modal({ 
  children,
  style,
  modalVisible,
  handleCloseModal,
  ...props
}) {
  return (
    <ReactNativeModal
      isVisible={modalVisible}
      onBackdropPress={handleCloseModal}
      onSwipeComplete={handleCloseModal}
      swipeDirection="down"
      backdropOpacity={0.4}
      propagateSwipe={true}
      style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }}
      avoidKeyboard
      {...props}
    >
      {children}
    </ReactNativeModal>
  );
}
