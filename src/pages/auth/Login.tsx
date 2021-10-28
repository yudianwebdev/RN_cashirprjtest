import {Text, View} from 'react-native';
import React from 'react';
import {InputCom} from '../../components/ComponentAtom';
import {useState} from 'react';
import BtnOutline from '../../components/BtnOutline';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: '100%',
          padding: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 24, fontWeight: '700'}}>Login Page</Text>
        <View style={{width: '100%'}}>
          <InputCom
            onChangeText={setEmail}
            Label={'Email'}
            placeholder="Email"
            value={email}
          />
          <InputCom
            onChangeText={setPassword}
            Label={'Password'}
            placeholder="Password"
            value={password}
          />
          <BtnOutline onPress={null} />
          <View style={{height: 12}}></View>
          <BtnOutline onPress={null} />
        </View>
      </View>
    </View>
  );
}

export default Login;
