import { View, Pressable, Text, StyleSheet, KeyboardAvoidingView, Alert} from "react-native"
import { router } from "expo-router"
import {themeColor} from '@/hooks/theme';

import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";



const dev_options = (props) => {
  
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
 }

    const showConfirmAlert = () => {
        Alert.alert(
          'Delete Storage Cache?',
          'This will permanently remove everything from your local device.',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => {clearAsyncStorage()},
            },
          ],
          { cancelable: false } 
        );
      };


    return (
        <View style={{backgroundColor: themeColor().primary}}>
            <KeyboardAvoidingView behavior='padding' style={{width: '100%', height: '100%'}} contentContainerStyle={{backgroundColor: 'black'}}>

            <View style={styles.Content}>
            

            <View style={[styles.headerContainer, {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}]}>
              
              <View style={{display: 'flex', gap: 10, marginTop: 30, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                <Text style={[styles.headerText, {marginLeft: 'auto', paddingLeft: 48, marginTop: 5}]}>Developer Options</Text>
                
                <Pressable onPress={() => {router.back()}} style={{marginLeft: 'auto', marginRight: 10, width: 26, backgroundColor: themeColor().secondary}}>
                    <Text style={[styles.closeButton, {marginLeft: 'auto', fontSize: 40}]}>x</Text>
                  </Pressable>
              </View>
            </View>
            <ScrollView>

            <Pressable style={{marginTop: 30}} onPress={showConfirmAlert}>
                    <Text style={styles.wipeButton}>Wipe Storage Cache</Text>
                </Pressable>

            </ScrollView>
            </View>

            </KeyboardAvoidingView>
        </View>
)}
export default dev_options

const styles = StyleSheet.create({
  
    Content: {
        height: '100%',
        width: '100%',
    
        backgroundColor: themeColor().primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10,
      },
      closeButton: {
        width: '100%',
        color: 'white',
        fontSize: 30,
        fontFamily: 'Arial',
        fontWeight: 900,
        textAlign: 'center',
        opacity: 0.4,
      },
      headerContainer: {
        width: 385,
        height: 90,
        backgroundColor: themeColor().secondary,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
      },
      headerText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        fontSize: 20,
        opacity: .6,
      },
      wipeButton: {
        color: 'red',
        fontFamily: 'JetBrainsMono',
        fontSize: 14,
        opacity: 0.6,
        textDecorationLine: 'underline',
    }
      
  })
