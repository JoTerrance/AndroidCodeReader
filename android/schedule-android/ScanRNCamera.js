import React, { useState, useEffect }from 'react';
import { Button, Text, View, StyleSheet, TextInput, ToastAndroid, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalInfo from './ModalInfo';
const ScanRNCamera = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ip, onChangeIp] = useState('192.168.0.18:3001')
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let url = new URL("http://"+ip+"/api/isTimeValid");
    data && url.searchParams.append("tokenId" , data);
    fetch(url).then(response =>{
      if(response.ok){
        ToastAndroid.show("VALID", ToastAndroid.SHORT);
      }else{
        ToastAndroid.show("FORBIDDEN", ToastAndroid.SHORT);  
      }
    })
  };
  const onCloseModal = (ip) => {
    setModalVisible(false);
    onChangeIp(ip);
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
      return (
        <>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
        </View>
    
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
        {scanned && <Button
          onPress={() => setScanned(false)}
          style={styles.enterBarcodeManualButton}
          title={'Tap to Scan Again'}
          />}
          {!scanned && <Button
            onPress={() => { 
              setModalVisible(true); 
            }}
            style={styles.enterBarcodeManualButton}
            title="Edit url" /> }
        </View>
        
        <ModalInfo visible={modalVisible} ipEdit={ip} onCloseModal={onCloseModal}/>    
        </>
          );
        }   
        const styles = {
          container: {
            flex: 1
          },
          overlay: {
            position: 'absolute',
            padding: 16,
            right: 0,
            left: 0,
            alignItems: 'center'
          },
          topOverlay: {
            top: 0,
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          bottomOverlay: {
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center'
          },
          enterBarcodeManualButton: {
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 40
          },
          scanScreenMessage: {
            fontSize: 14,
            color: 'white',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }
        };
        
        export default ScanRNCamera;
            {/* <RNCamera
          defaultTouchToFocus
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          type={state.camera.type}
        />  */}