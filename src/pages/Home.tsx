import React, {Component, useEffect, useState} from 'react';
// import {View} from 'react-native';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  TextInput,
  Dimensions,
} from 'react-native';

import {TouchBtn, TouchBtnOutline} from '../components/ComponentAtom';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
// import {View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native';

const {height, width} = Dimensions.get('screen');

interface TestRowProps {
  xml: string;
  desc: string;
  output: string;
  expectedOutput: string;
  rowNumber: number;
}
function Home({navigation}: any) {
  const [QRCode, setQRCode] = useState('');
  const [Barcode, setBarcode] = useState('');
  const [NamaBarang, setNamaBarang] = useState('');
  const [StokBarang, setStokBarang] = useState('');
  const [HargaSatuan, setHargaSatuan] = useState('');
  const [Scanner, setScanner] = useState(true);

  const [Type, setType] = useState('');
  const [QrcodeInput, setQrcodeInput] = useState('');
  const url = 'http://192.168.213.202:8000/api/';
  const [flash, setFlash] = useState(false);
  const qr = [
    {qrcode: 'Data 1kjlfkjaskfjalfkjlakfj'},
    {qrcode: 'data 2lklkasfalkhfalkshflashf'},
    {qrcode: 'Data 3lkajsflkajflakflkasf'},
  ];
  // useEffect(() => {
  //   AsyncStorage.setItem('UID123', 'asdc');
  //   // AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
  //   //   AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
  //   //     AsyncStorage.getItem('UID123', (err, result) => {
  //   //       console.log(result);
  //   //     });
  //   //   });
  //   // });
  // }, []);
  //   AsyncStorage.setItem('UID123', JSON.stringify(UID123_object)
  useEffect(() => {
    console.log('flash', qr);
  }, [flash]);
  return (
    <View style={{flex: 1, height: height, width: width}}>
      <View style={{flex: 1}}>
        <View>
          <View style={{padding: 12}}>
            <Text
              style={{fontSize: 56, textAlign: 'center', fontWeight: '800'}}>
              Aplikasi Cashier Online
            </Text>
            <Text style={{fontSize: 30, textAlign: 'center'}}>
              By Guru Honorer Project
            </Text>
          </View>
          <View>
            <TouchBtn
              text={'New Transaksi'}
              onPress={() => navigation.navigate('Transaksi')}
            />
            <TouchBtn
              text={'New Stok'}
              onPress={() => navigation.navigate('NewStock')}
            />
            <TouchBtn
              text={'List Transaksi'}
              onPress={() => navigation.navigate('Transaksi')}
            />
            <TouchBtnOutline
              text={'Cek Harga'}
              onPress={() => navigation.navigate('Transaksi')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
export default Home;
