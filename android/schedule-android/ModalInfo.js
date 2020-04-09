
import React, { useState, useEffect }from 'react';
import { Button, Text, View, StyleSheet, TextInput, ToastAndroid, Modal } from 'react-native';
const ModalInfo = ({visible, ipEdit, onCloseModal}) => {
  let [ip, setIp] = useState(ipEdit);
  return(
        <Modal  visible={visible} transparent={true}  animationType="slide">
          <View  style={styles.content}>
                <Text style={styles.block}>Actual Ip: {ip}</Text>
                <TextInput style={styles.text} onChangeText={text => 
                    setIp(text) } value={ip} />
              <View style={styles.buttonRow}>
                <Button style={styles.closeButton} title="Close" onPress={ () =>onCloseModal(ip) } />
              </View>
            </View>
        </Modal>
        );
          }

          const styles = StyleSheet.create({
            content: {
              marginTop: 500,
              paddingBottom: 0,
              flex: 1,
              backgroundColor: 'rgba(255,255,255,1)',
              shadowOffset: { width: 0, height: -3 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 30,
              bottom:1
            },
            text: {
              borderBottomWidth: 1,
              padding: 5
            },
            buttonRow: {
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 30,
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
