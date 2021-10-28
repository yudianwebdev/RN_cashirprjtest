import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

function BtnOutline({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: '100%',
          borderColor: 'green',
          borderRadius: 8,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
        }}>
        <Text>Login</Text>
      </View>
    </TouchableOpacity>
  );
}

export default BtnOutline;
