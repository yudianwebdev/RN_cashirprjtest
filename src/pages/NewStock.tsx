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
import {SwipeablePanel} from 'rn-swipeable-panel';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
// import {View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {InputCom, TouchBtn, TouchBtnOutline} from '../components/ComponentAtom';

const {height, width} = Dimensions.get('screen');

interface TestRowProps {
  xml: string;
  desc: string;
  output: string;
  expectedOutput: string;
  rowNumber: number;
}
interface Items {
  NamaBarang: string;
  user_count: number;
  Harga: number;
}
function NewStock({navigation}: any) {
  const [QRCode, setQRCode] = useState('');
  const [Barcode, setBarcode] = useState('');
  const [NamaBarang, setNamaBarang] = useState('');
  const [StokBarang, setStokBarang] = useState('');
  const [HargaSatuan, setHargaSatuan] = useState('');
  const [UangCash, setUangCash] = useState('');
  const [UangKembalian, setUangKembalian] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [Transaksi, setTransaksi] = useState<Items[]>([]);

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [Scanner, setScanner] = useState(true);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const [Type, setType] = useState('');
  const [QrcodeInput, setQrcodeInput] = useState('');
  const url = 'http://192.168.24.202:8000/api/';
  const [flash, setFlash] = useState(false);
  const qr = [
    {qrcode: 'Data 1kjlfkjaskfjalfkjlakfj'},
    {qrcode: 'data 2lklkasfalkhfalkshflashf'},
    {qrcode: 'Data 3lkajsflkajflakflkasf'},
  ];
  useEffect(() => {
    const resKem = parseInt(UangCash) - totalHarga;
    console.log(resKem);
    setUangKembalian(resKem);
  }, [UangCash]);
  useEffect(() => {
    axios
      .get(`${url}qrcode`)
      .then(response => {
        const res = response.data.data;
        console.log('get respons', res);
        setTotalHarga(res.TotalHarga);
        setTransaksi(res.Taransaksi);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function SaveData() {
    console.log('jalan');
    axios
      .post(`${url}StokBarang`, {
        BarCode: Barcode,
        NamaBarang: NamaBarang,
        StokBarang: parseInt(StokBarang),
        HargaSatuan: parseInt(HargaSatuan),
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function Bayar() {
    if (UangKembalian >= 0 && parseInt(UangCash) != 0) {
      console.log('qwert', JSON.stringify(Transaksi));
      axios
        .post(`${url}Transaksi`, {
          UangKembalian: UangKembalian,
          UangCash: parseInt(UangCash),
          TotalHarga: totalHarga,
          Taransaksi: Transaksi,
          // Barcode: res.BarCode,
          // NamaBarang: res.NamaBarang,
          // Harga: res.HargaSatuan,
        })
        .then(response => {
          console.log(response.data);
          // GetDataBarang();
          setTotalHarga(0);
          setUangCash('');
          setUangKembalian(0);
          console.log('mari');
        })
        .catch(error => {
          console.log(error);
          console.log('disini');
        });
    }
  }
  function onlySmall() {}

  function GetDataBarang() {
    console.log(`${url}qrcode`);
    axios
      .get(`${url}qrcode`)
      .then(response => {
        const res = response.data.data;
        console.log('get respons', res);
        setTotalHarga(res.TotalHarga);
        setTransaksi(res.Taransaksi);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function QRScenner(e: any) {
    setQRCode(e.data);
    console.log('url', url);
    if (e.type === 'EAN_13') {
      setBarcode(e.data);
      setScanner(false);
      setIsPanelActive(true);
      // axios
      //   .post(`${url}qrcode`, {
      //     qrcode: e.data,
      //   })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
  }
  return (
    <View
      style={{
        flex: 1,
        height: height,
        width: width,
        position: 'relative',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            borderColor: 'red',
            // paddingBottom: '100%',
            height: 400,
            backgroundColor: 'black',
            position: 'relative',
          }}>
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              bottom: 0,
              right: 0,
              left: 0,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                openPanel();
              }}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>List</Text>
            </TouchableOpacity>
            {flash ? (
              <TouchableOpacity
                onPress={() => {
                  setFlash(false);
                }}
                style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Light Off</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFlash(true);
                }}
                style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Light On</Text>
              </TouchableOpacity>
            )}
          </View>
          <QRCodeScanner
            onRead={QRScenner}
            reactivate={true}
            reactivateTimeout={3000}
            containerStyle={{
              zIndex: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: height / 5,
              // width: 300,
              margin: 10,
              padding: 10,
            }}
            showMarker
            customMarker={
              <View
                style={{
                  width: 300,
                  height: 200,
                  position: 'relative',
                  // backgroundColor: 'yellow',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 50,
                    height: 50,
                    borderTopColor: 'blue',
                    borderLeftColor: 'blue',
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderWidth: 0,
                  }}></View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 50,
                    height: 50,
                    borderTopColor: 'blue',
                    borderRightColor: 'blue',
                    // borderWidth: 2,
                    borderRightWidth: 2,
                    borderTopWidth: 2,
                  }}></View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 50,
                    height: 50,
                    borderBottomColor: 'blue',
                    borderLeftColor: 'blue',
                    borderBottomWidth: 2,
                    borderLeftWidth: 2,
                    borderWidth: 0,
                  }}></View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 50,
                    height: 50,
                    borderBottomColor: 'blue',
                    borderRightColor: 'blue',
                    borderRightWidth: 2,
                    borderBottomWidth: 2,
                    borderWidth: 0,
                  }}></View>
              </View>
            }
            cameraProps={{
              // style:{styles.preview},
              // autoFocus: RNCamera.Constants.AutoFocus.off,
              autoFocusPointOfInterest: {x: 0.5, y: 0.5},
              zoom: 0.6,
              ratio: '1:1',
              // onDoubleTap,
              // focusDepth: 1,
              flashMode: flash
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off,

              // type: RNCamera.Constants.Type.front,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 20,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // padding: 20,
            }}>
            <View
              style={{
                borderTopColor: 'black',
                borderTopWidth: 5,
                width: 30,
              }}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}></View>
        </View>
      </ScrollView>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <InputCom
          onChangeText={setBarcode}
          editable={false}
          selectTextOnFocus={false}
          Label={'BarCode'}
          placeholder="BarCode QTY"
          disableFullscreenUI={true}
          value={Barcode}
        />
        <InputCom
          onChangeText={setNamaBarang}
          Label={'Name Product'}
          placeholder="Name Product"
          value={NamaBarang}
        />
        <InputCom
          onChangeText={setStokBarang}
          Label={'Stock Product'}
          placeholder="Stock Product"
          keyboardType="numeric"
          value={StokBarang}
        />
        <InputCom
          onChangeText={setHargaSatuan}
          Label={'Price QTY'}
          placeholder="Price QTY"
          keyboardType="numeric"
          value={HargaSatuan}
        />

        <View
          style={{
            flexDirection: 'row',
            zIndex: 10,
          }}>
          <View style={{flex: 1}}>
            <TouchBtnOutline
              onPress={() => navigation.navigate('Home')}
              text="Cencel"
            />
          </View>
          <View style={{flex: 1}}>
            <TouchBtn onPress={() => SaveData()} text="Save" />
          </View>
        </View>
      </SwipeablePanel>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

export default NewStock;
