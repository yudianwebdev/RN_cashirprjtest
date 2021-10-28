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
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
// import {View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native';

interface TestRowProps {
  xml: string;
  desc: string;
  output: string;
  expectedOutput: string;
  rowNumber: number;
}
function StokProduct() {
  const [QRCode, setQRCode] = useState('');
  const [Barcode, setBarcode] = useState('');
  const [NamaBarang, setNamaBarang] = useState('');
  const [StokBarang, setStokBarang] = useState('');
  const [HargaSatuan, setHargaSatuan] = useState('');
  const [Scanner, setScanner] = useState(true);

  const [Type, setType] = useState('');
  const [QrcodeInput, setQrcodeInput] = useState('');
  const url = 'http://192.168.24.202:8000/api/';
  const [flash, setFlash] = useState(false);

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

  function QRScenner(e: any) {
    setQRCode(e.data);
    console.log('url', url);
    if (e.type === 'EAN_13') {
      setBarcode(e.data);
      setScanner(false);
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
    // {
    //   console.log('data bukan QrCode');
    //   // await Promise.all(qr.map(async i => {}));
    //   qr.forEach(file => {
    //     console.log('data bukan QrCode', file.qrcode);
    //     axios
    //       .post(`${url}qrcode`, {
    //         qrcode: 'ini buat uji coba' + file.qrcode + '/' + file.qrcode,
    //       })
    //       .then(response => {
    //         console.log(response);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //     // formData.append("file[]", file, file.name);
    //   });
    // }
    setType(e.type);
    console.log([e]);
    console.log(e.type);
  }
  return (
    // <View>
    //   <Text>ini text</Text>
    // </View>
    <View style={{flex: 1, position: 'relative'}}>
      {Scanner ? (
        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'red', position: 'relative'}}>
            <QRCodeScanner
              onRead={QRScenner}
              reactivate={true}
              reactivateTimeout={3000}
              cameraStyle={{
                paddingTop: 70,
                position: 'absolute',
                height: '100%',
              }}
              showMarker
              customMarker={
                <View
                  style={{
                    width: 300,
                    height: 300,
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
                // autoFocus: RNCamera.Constants.AutoFocus.off,
                autoFocusPointOfInterest: {x: 0.5, y: 0.5},
                zoom: 0.6,
                // onDoubleTap,
                // focusDepth: 1,
                flashMode: flash
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off,

                // type: RNCamera.Constants.Type.front,
              }}
            />
            <View style={{position: 'absolute', bottom: 0, right: 0}}></View>
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: 80,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
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
          </View>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'blue'}}>
          <View style={{height: 90, backgroundColor: 'red'}}>
            <TouchableOpacity
              onPress={() => {
                setScanner(true);
              }}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Button title="Go to Details" onPress={() => setScanner(true)} />
          </View>
          <View style={{backgroundColor: 'green'}}>
            <TextInput
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onChangeText={setNamaBarang}
              value={NamaBarang}
              placeholder="useless placeholder"
            />
            <Button title="Go to Details" onPress={() => setScanner(true)} />
            <TextInput
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onChangeText={setHargaSatuan}
              value={HargaSatuan}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
            <TextInput
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onChangeText={setStokBarang}
              value={StokBarang}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onPress={() => SaveData()}>
              <Text style={styles.buttonText}>Off</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
{
  /* {Scanner ? (
        <QRCodeScanner
          onRead={QRScenner}
          reactivate={true}
          reactivateTimeout={3000}
          cameraProps={{
            // autoFocus: RNCamera.Constants.AutoFocus.off,
            autoFocusPointOfInterest: {x: 0.5, y: 0.5},
            zoom: 0.6,
            // onDoubleTap,
            // focusDepth: 1,
            flashMode: flash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off,

            // type: RNCamera.Constants.Type.front,
          }}
          topContent={
            <View>
              <Text style={styles.centerText}>
                ini Cashire Function Loh {QRCode}
                <Text style={styles.textBold}>
                  wikipedia.org/wiki/QR_code
                </Text>{' '}
                on your computer and scan the QR code.
              </Text>
              flash ? (
              <TouchableOpacity
                onPress={() => {
                  setFlash(false);
                }}
                style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Off</Text>
              </TouchableOpacity>
              ) : (
              <TouchableOpacity
                onPress={() => {
                  setFlash(true);
                }}
                style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>On</Text>
              </TouchableOpacity>
              )
            </View>
          }
        />
      ) : (
        <View style={{flex: 1, backgroundColor: 'blue'}}>
          <View style={{height: 50, backgroundColor: 'red'}}></View>
          <View style={{height: 250, backgroundColor: 'green'}}>
            <TextInput
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onChangeText={setNamaBarang}
              value={NamaBarang}
              placeholder="useless placeholder"
            />
            <TextInput
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onChangeText={setHargaSatuan}
              value={HargaSatuan}
              placeholder="useless placeholder"
            />
            <TextInput
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onChangeText={setStokBarang}
              value={StokBarang}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={{padding: 12, backgroundColor: 'pink', margin: 12}}
              onPress={SaveData}>
              <Text style={styles.buttonText}>Off</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View> */
}
// AppRegistry.registerComponent('default', () => ScanScreen);
export default StokProduct;
