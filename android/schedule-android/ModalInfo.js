
import React, { useState, useEffect }from 'react';
import { Button, Text, View, StyleSheet, TextInput, ToastAndroid, Modal } from 'react-native';
const ModalInfo = ({visible, ipInput, onCloseModal}) => {
//  let [modalVisible, setModalVisible] = useState(visible);
  let [ip, setIp] = useState(ipInput);
  //setModalVisible(visible);
  return(
        <View  style={styles.container}>
        <Modal isVisible={visible} transparent={true}  animationType="slide"  
        onRequestClose={onCloseModal(ip)}>
          <View style={styles.content} >
                <Text>Actual Ip: {ip}</Text>
                <TextInput onChangeText={text => setIp(text)} value={ip} />
              <View style={styles.buttonRow}>
                <Button title="Close" onPress={onCloseModal(ip)} color="#ff0000" />
              </View>
            </View>
        </Modal>
</View>
        );
          }

          const styles = StyleSheet.create({
            container: {
              flex: 1,
              alignItems: "flex-end",
              flexDirection: "column"
            },
            content: {
              padding: 20,
              paddingBottom: 30,
              flex: 1,
              backgroundColor: "#ffffff",
              shadowOffset: { width: 0, height: -3 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 30
              // width: 200
            },
            text: {
              borderBottomWidth: 1,
              padding: 5
            },
            closeIcon: {
              color: "#fff"
            },
            buttonRow: {
              flexDirection: "row",
              justifyContent: "space-around",
              paddingBottom: 20
            },
            block: {
              margin: 10
            },
            closeButton: {
              display: 'flex',
              height: 60,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FF3974',
              shadowColor: '#2AC062',
              shadowOpacity: 0.5,
              shadowOffset: { 
                height: 10, 
                width: 0 
              },
              shadowRadius: 25,
            },
            closeText: {
              fontSize: 24,
              color: '#00479e',
              textAlign: 'center',
            }
          });
export default ModalInfo;
