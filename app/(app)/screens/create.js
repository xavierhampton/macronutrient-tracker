import {View, Text, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import React, {useState, useEffect} from 'react';
import {themeColor} from '@/hooks/theme';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {router} from 'expo-router'


const create = (props) => {
 
          const [servingsArray, setServingsArray] = useState([<View>
            <View style={[styles.flexContainer, {height: 80, width: 350, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                  <Text style={styles.label}>Serving Name</Text>
                  <Text style={[styles.label, {color:'red', fontSize: 10, marginRight: 'auto', transform: 'translateY(-10px) translateX(-10px)'}]}>*</Text>
                  <TextInput maxLength={20}style={[styles.textInput, {width: 140, textAlign: 'center',}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 350, borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
                  <Text style={styles.label}>Weight</Text>
                  <TextInput  maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                  <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5}]}>g</Text>
            </View>
            </View>])
          useEffect(() => {}, [servingsArray])
          
        function newServing() {
          if (servingsArray.length < 3) {
          let tmp = servingsArray.slice()
          tmp.push(addNewServingUI(servingsArray.length + 1))
          setServingsArray(tmp)
          }
        }
        function deleteServing(k) {
          let tmp = servingsArray.slice()
          tmp.splice(k,1)
          setServingsArray(tmp)
        }
        function getServings() {
          const arr = []
          for (let i = 0; i < servingsArray.length; i++) {
            arr.push(<View key={i}>{servingsArray[i]}</View>)
          }
          return arr
        }

        function addNewServingUI(k) {
          return (
            <View style={{paddingTop: 10}}>
            <View style={[styles.flexContainer, {height: 80, width: 350, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingTop: 10}]}>
                  <Text style={styles.label}>Serving Name</Text>
                  <TextInput maxLength={20}style={[styles.textInput, {width: 140, textAlign: 'center',}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 350, borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
                  <Text style={styles.label}>Weight</Text>
                  <TextInput  maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                  <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5}]}>g</Text>
                  <Pressable onPress={() =>{deleteServing(k)}} style={{position: 'absolute', right: -5, top: -90,borderRadius: 100, backgroundColor: themeColor().secondary, width: 26, height: 26, borderColor: 'white', borderWidth: 1}}><Text style={{fontFamily: 'JetBrainsMono',fontSize: 24, color:'white', textAlign: 'center', transform: 'translateY(-6px)'}}>x</Text></Pressable>
            </View>
            </View>
          )
          
        }


        return (
          <View>
              <KeyboardAvoidingView behavior='height' style={{width: '100%'}}>
              <View style={styles.Content}> 

              <View style={[styles.headerContainer, {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}]}>
              <Pressable onPress={() => {router.back()}} style={{width: 26, marginBottom: 10, marginLeft:'auto', backgroundColor: themeColor().secondary}}>
                      <Text style={[styles.closeButton, {marginLeft: 'auto', fontSize: 40, transform: 'translateX(-10px) translateY(10px)'}]}>x</Text>
                    </Pressable>
                <Text style={[styles.headerText, {transform: 'translateY(-20px)'}]}>Custom Food</Text>
                
              </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        
            <View style={styles.Content}>
              
              <View style={{display: 'block', width: '100%'}}>
                <Text style={styles.subHeaderText}>Food Information</Text>
              </View>
              <View style={styles.foodInformationContainer}>
                  
                  <View style={[styles.flexContainer, {height: 80, width: 350, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                    <Text style={styles.label}>Food Name</Text>
                    <Text style={[styles.label, {color:'red', fontSize: 10, marginRight: 'auto', transform: 'translateY(-10px) translateX(-10px)'}]}>*</Text>
                    <TextInput maxLength={20}style={[styles.textInput, {width: 190, padding: 5}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 60, width: 350, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopColor: 'rgba(255,255,255,0.1)', borderTopWidth: 1}]}>
                    <Text style={styles.label}>Barcode</Text>
                    <View style={[styles.textInput, {width: 120, padding: 5, marginRight: 30}]}></View>
                  </View>

                  <View style={{display: 'block', width: '100%'}}>
                <Text style={[styles.subHeaderText, {marginTop: 20, marginBottom: 2}]}>Servings</Text>
                </View>

                 {getServings()}
                  
              </View>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.newServingButton,{zIndex: 1}]} onPress={newServing} hitSlop={20}>
                    <Text style={{color:'white', fontSize: 14, fontFamily: 'JetBrainsMono', textAlign: 'center', lineHeight: 30, height: 30}}>Add New Serving</Text>
              </Pressable>

              <View style={{display: 'block', width: '100%'}}>
                <Text style={[styles.subHeaderText, {marginTop: 70}]}>Food Macros</Text>
              </View>
              <View style={styles.foodMacrosContainer}>
                  <View style={[styles.flexContainer, {height: 70, width: 350}]}>
                    <Text style={styles.label}>Calories</Text>
                    <TextInput maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 80, textAlign: 'center',}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 60, textAlign: 'center', height: 30}]}>kcal</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 350}]}>
                    <Text style={styles.label}>Carbs</Text>
                    <TextInput maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5,}]}>g</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 350}]}>
                    <Text style={styles.label}>Protein</Text>
                    <TextInput maxLength={4} keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5,}]}>g</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 350}]}>
                    <Text style={styles.label}>Fat</Text>
                    <TextInput maxLength={4} keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5}]}>g</Text>
                  </View>
              </View>
              
            </View>
            
          </ScrollView>
          </View>
          
          </KeyboardAvoidingView>

          <View style={{display: 'flex', position: 'absolute', bottom: 35, width: '100%', height: 40, justifyContent: 'center', alignContent:'center', left: 45}}>
          <Pressable onPress={props.toggleCreateFood} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {width: 300, height: 60, backgroundColor: themeColor().secondary}]}>
                  <MaskedView
                  style={{width: 300, height: 60}}
                  maskElement={<View style={{width: 300, height: 60, borderColor: 'white', borderWidth: 3, borderRadius: 10}}><Text></Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                  <View style={{ width: 300, height: 60}}>
                    <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 26, color: 'white', width: 300, height: 60, textAlign: 'center', transform: 'translateY(-47px)'}}>Create Food</Text>
                  </View>
              </Pressable>   
            </View>
            </View> 
          
            
    
        )
      }

      export default create



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
    marginTop: 40,
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
  subHeaderText: {
    color: 'white',
    opacity: .6,
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: -10,
  },
  foodInformationContainer: {
    width: 360,
    
    borderRadius: 10,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  foodMacrosContainer: {
    width: 360,
    height: 300,

    gap: 10,
    
    borderRadius: 10,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createFoodButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor().secondary,
    borderRadius: 10,
  },
  label: {
    fontFamily: 'JetBrainsMono',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    width: 200,
    borderColor: 'white',
    borderWidth: 2,
    height: 40,
    borderRadius: 5,
    marginLeft: 'auto',
    color: 'white',
    fontSize: 16,
    fontFamily: 'JetBrainsMono',
    marginRight: 10,
  },
  newServingButton: {
    backgroundColor: '#306844',
    width: 300,
    height: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -10,
    marginBottom: -50,
  }


})