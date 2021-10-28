import React from 'react';
import {View} from 'react-native';
import {Text, TextInput, TouchableOpacity} from 'react-native';

function InputCom({
  onChangeText,
  Label,
  value,
  editable = true,
  selectTextOnFocus = true,
  placeholder,
  keyboardType = 'default',
  disableFullscreenUI = false,
}: any) {
  return (
    <View style={{flexDirection: 'column', display: 'flex'}}>
      <Text style={{}}>{Label}</Text>
      <View style={{paddingVertical: 12}}>
        <TextInput
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          disableFullscreenUI={disableFullscreenUI}
          style={{
            padding: 12,
            borderWidth: 2,
            borderRadius: 8,
            borderColor: 'blue',
            color: 'black',
            backgroundColor: 'white',
          }}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
        />
        <Text>Pesan Error Nanti di buat</Text>
      </View>
    </View>
  );
}

function TouchBtn({children, onPress, text, outline = true}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 8,
        margin: 12,
        alignContent: 'center',
        // flex: 1,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          textAlign: 'center',
          alignContent: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
function TouchBtnOutline({children, onPress, text, outline = true}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: 'blue',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        margin: 12,
        alignContent: 'center',
        // flex: 1,
      }}>
      <Text
        style={{
          color: 'blue',
          fontSize: 24,
          textAlign: 'center',
          alignContent: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

function Gap({width = 0, height = 0, onPress}: any) {
  return <View style={{width: width, height: height}} />;
}

export {InputCom, TouchBtn, Gap, TouchBtnOutline};
