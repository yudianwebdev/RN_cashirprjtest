import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, Animated} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
const {width, height} = Dimensions.get('screen');
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScrollView} from 'react-native-gesture-handler';
// interface Items {
//   toValue: number;
//   duration: number;
// }

function Swebup() {
  const [aligment] = useState(new Animated.Value(0));
  const Upanmiated = () => {
    Animated.timing(aligment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const downanmiated = () => {
    Animated.timing(aligment, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const actionInretpolate = aligment.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 2.4 + 150, 0],
  });

  const actionStyle = {
    bottom: actionInretpolate,
  };

  const gestureHendle = (e: any) => {
    if (e.nativeEvent.contentOffset.y > 0) Upanmiated();
    else if (e.nativeEvent.contentOffset.y < 0) downanmiated();
  };
  return (
    <Animated.View style={[styles.container, actionStyle]}>
      <View>
        <ScrollView
          onScroll={e => gestureHendle(e)}
          style={{
            borderTopColor: 'red',
            borderTopWidth: 3,
            width: 70,
            height: 50,
            backgroundColor: 'red',
          }}></ScrollView>
      </View>
      <Text>asd</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 2.4,
    borderRadius: 40,
  },
});

function Index() {
  return (
    <View style={{flex: 1, position: 'relative', backgroundColor: 'white'}}>
      <View>
        <Text>asfafafs</Text>
      </View>
      <Swebup />
    </View>
  );
}

export default Index;
