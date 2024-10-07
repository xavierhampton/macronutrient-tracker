import {View, Text, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {themeColor} from '@/hooks/theme';
import MaskedView from '@react-native-masked-view/masked-view';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from 'expo-linear-gradient';
import {router} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';



const create = (props) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  

  const [recents, setRecents] = useState([])

  const fetchRecents = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('recents');
        return setRecents(jsonValue != null ? JSON.parse(jsonValue) : [])          } 
        catch (e) {
        console.log('fetch error')
        return
      }
      
    };

  const storeRecents = async (value) => {
    try {
      fetchRecents();
    }
    catch {
      console.log('store error')
      return
    }
    const newRecents = []
    for (i of recents) {
      newRecents.push(i)
    }
    newRecents.push(value)

    if (newRecents > 50) {
      newRecents.shift()
    }

    try {
      const jsonValue = JSON.stringify(newRecents);
      await AsyncStorage.setItem('recents', jsonValue);
    }
     catch (e) {
      console.log('store error')
      return
    }
  };

  // Implement
  const saveFood = () => {
    const newFood = {name: 'Philly Cheese', serving: [{servingName: 'sandwhich', cal: 1000, pro: 100, car: 200, fat: 90}]}
    storeRecents(newFood)
    console.log("SAVE")
  }
 
          const [servingsArray, setServingsArray] = useState([<View>
            <View style={[styles.flexContainer, {height: 80, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                  <Text style={styles.label}>Serving Name</Text>
                  <Text style={[styles.label, {color:'red', fontSize: 10, marginRight: 'auto', transform: 'translateY(-10px) translateX(-10px)'}]}>*</Text>
                  <TextInput maxLength={20}style={[styles.textInput, {width: 140, textAlign: 'center',}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
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
            <View style={{paddingTop: 5}}>
            <View style={[styles.flexContainer, {height: 80, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingTop: 10, }]}>
                  <Text style={styles.label}>Serving Name</Text>
                  <TextInput maxLength={20}style={[styles.textInput, {width: 140, textAlign: 'center',}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
                  <Text style={styles.label}>Weight</Text>
                  <TextInput  maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                  <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5}]}>g</Text>
                  <Pressable onPress={() =>{deleteServing(k)}} style={{position: 'absolute', right: 0, top: -88,borderRadius: 100, backgroundColor: themeColor().secondary, width: 26, height: 26, borderColor: 'white', borderWidth: 1}}><Text style={{fontFamily: 'JetBrainsMono',fontSize: 24, color:'white', textAlign: 'center', transform: 'translateY(-6px)'}}>x</Text></Pressable>
            </View>
            </View>
          )
          
        }


        return (
          <View style={{backgroundColor: themeColor().primary}}>
              <KeyboardAvoidingView behavior='position' style={{width: '100%', height: '100%'}} contentContainerStyle={{backgroundColor: 'black'}}>
              <View style={styles.Content}> 

              <View style={[styles.headerContainer, {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}]}>
              <Pressable onPress={() => {router.back()}} style={{width: 26, marginBottom: 10, marginLeft:'auto', backgroundColor: themeColor().secondary}}>
                      <Text style={[styles.closeButton, {marginLeft: 'auto', fontSize: 40, transform: 'translateX(-10px) translateY(10px)'}]}>x</Text>
                    </Pressable>
                <Text style={[styles.headerText, {transform: 'translateY(-20px)'}]}>Custom Food</Text>
                
              </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 150, width: '100%'}}>
        
            <View style={styles.Content}>
              
              <View style={{display: 'block', width: '100%'}}>
                <Text style={[styles.subHeaderText, {width: 375, textAlign: 'left'}]}>Food Information</Text>
              </View>
              <View style={styles.foodInformationContainer}>
                  
                  <View style={[styles.flexContainer, {height: 80, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                    <Text style={styles.label}>Food Name</Text>
                    <Text style={[styles.label, {color:'red', fontSize: 10, marginRight: 'auto', transform: 'translateY(-10px) translateX(-10px)'}]}>*</Text>
                    <TextInput maxLength={20}style={[styles.textInput, {width: 190, padding: 5}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 60, width: 375, borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
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
                <Text style={[styles.subHeaderText, {marginTop: 70, width: 375}]}>Food Macros</Text>
              </View>
              <View style={styles.foodMacrosContainer}>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                    <Text style={styles.label}>Calories</Text>
                    <TextInput maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 80, textAlign: 'center',}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 60, textAlign: 'center', height: 30}]}>kcal</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderRadius: 0}]}>
                    <Text style={styles.label}>Carbs</Text>
                    <TextInput maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5,}]}>g</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderRadius: 0}]}>
                    <Text style={styles.label}>Protein</Text>
                    <TextInput maxLength={4} keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'center'}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5,}]}>g</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
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
          <Pressable onPress={() => handleSnapPress(0)} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {width: 300, height: 60, backgroundColor: themeColor().secondary}]}>
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


            <BottomSheet
            ref={sheetRef}
            enablePanDownToClose={true}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            backgroundStyle={{backgroundColor: themeColor().secondary, shadowColor: 'white', shadowOpacity: 0.2, shadowRadius: 2}}
            handleIndicatorStyle={{backgroundColor: 'rgba(170,170,170,1)'}}>
            
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: 10}}>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 20}}>
                    <Pressable onPress = {() => handleClosePress()} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 },{backgroundColor: '#683030', borderRadius: 10, width: 140, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center'}]}>
                      <Text style={{fontFamily: 'JetBrainsMono', color: 'white', fontSize: 18, textAlign: 'center'}}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress = {() => {saveFood(); router.push('/main/home')}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 },{backgroundColor: '#306844', borderRadius: 10, width: 140, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center'}]}>
                      <Text style={{fontFamily: 'JetBrainsMono', color: 'white', fontSize: 18, textAlign: 'center'}}>Save</Text>
                    </Pressable>
                    </View>
                    
                    <Pressable onPress={() => {saveFood(); router.push({pathname: '/screens/overview', params: {create: true}});}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 },{borderColor: '#684468', borderRadius: 10, borderWidth: 2,  width: 300, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}]}>
                    <MaskedView
                    style={{width: 300, height: 60}}
                    maskElement={<View style={{width: 300, height: 60, borderColor: 'white', borderWidth: 3, borderRadius: 10}}><Text style={{fontFamily: 'JetBrainsMono', color: 'white', fontSize: 24, textAlign: 'center', lineHeight: 52}}>Save & Track</Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                    
                     
                    </Pressable>
                </View>
            
            </BottomSheet>
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
    width: 375,
    
    borderRadius: 10,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  foodMacrosContainer: {
    width: 375,
    height: 300,

    gap: 0,
    
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