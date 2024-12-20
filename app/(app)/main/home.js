import {View, Text, Pressable, ScrollView, Button} from 'react-native'
import {router} from 'expo-router'
import React, {Component, useDebugValue, useEffect, useState} from 'react'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import { Circle, Bar } from 'react-native-progress';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import MaskedView from '@react-native-masked-view/masked-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getTargets from '@/components/getTargets.js'

import Food from '@/components/Food'

export default function Home() {

    const [data, setData] = useState(new Date())
    const [foodArr, setFoodArr] = useState({})

    const [targetCal, setTargetCal] = useState(2000)
    const [targetCar, setTargetCar] = useState(250)
    const [targetFat, setTargetFat] = useState(66)
    const [targetPro, setTargetPro] = useState(100)

    const [dailyCal, setCal] = useState(0)
    const [dailyCar, setCar] = useState(0)
    const [dailyFat, setFat] = useState(0)
    const [dailyPro, setPro] = useState(0)

 


     /*const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            router.push('/')
        })
        .catch(error => console.log(error.message))
    }*/

    /*const storeFoods = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('1/20/2024', jsonValue);
        } catch (e) {
          return
        }
      };*/

      const pushOverviewCache = async (i) => {
        try {
          const jsonValue = JSON.stringify(foodArr[i]);
          await AsyncStorage.setItem('overview-cache', jsonValue);
        }
         catch (e) {
          console.log('store error')
          return
        }
      }

      const pushDateOverviewCache = async (i) => {
        try {
          await AsyncStorage.setItem('date-overview-cache', String(data.getMonth()) + '/' + String(data.getDate()) + '/' + String(data.getFullYear()));
        }
         catch (e) {
          console.log('store error')
          return
        }
      }

    const fetchFoods = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(String(data.getMonth()) + '/' + String(data.getDate()) + '/' + String(data.getFullYear()));
            return setFoodArr(jsonValue != null ? JSON.parse(jsonValue) : null)          } catch (e) {
            console.log('fetch error')
            return
          }
          
        };

        const fetchGoals = async () => {
            const d = await getTargets()
            setTargetCal(d['cal'])
            setTargetCar(d['car'])
            setTargetPro(d['pro'])
            setTargetFat(d['fat'])    
        }

    const getDailyFood = (fArr) => {
        if (!fArr) {
            return (<View><Text style={styles.emptyText}>This is where your food will display. Add food below to get started.</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>V</Text></View>)
        }
        const arr = []
        for (let i = 0; i < foodArr.length; i++) {
            arr.push(<Food pressFunc={() => {pushOverviewCache(i); pushDateOverviewCache(); router.push('screens/simple_overview')}} key={i} mult={foodArr[i].mult} name={foodArr[i].name} servingName={foodArr[i].servings[foodArr[i].selectedServing].servingName} cal={foodArr[i].servings[foodArr[i].selectedServing].cal * foodArr[i].mult}></Food>)
        } 
        return arr
    }

    const updateCharts = () => {
        let curCal = 0
        let curFat = 0
        let curPro = 0
        let curCar = 0
        if (foodArr) {
            for (let i = 0; i < foodArr.length; i++) {
                curCal += foodArr[i].servings[foodArr[i].selectedServing].cal * foodArr[i].mult
                curPro += foodArr[i].servings[foodArr[i].selectedServing].pro * foodArr[i].mult
                curCar += foodArr[i].servings[foodArr[i].selectedServing].car * foodArr[i].mult
                curFat += foodArr[i].servings[foodArr[i].selectedServing].fat * foodArr[i].mult
            }
        }
        setCal(curCal); setPro(curPro); setCar(curCar); setFat(curFat);
    }

    const increaseDate = () => {
            const newDate = new Date(); newDate.setDate(data.getDate()); newDate.setMonth(data.getMonth()); newDate.setFullYear(data.getFullYear());
            newDate.setDate(data.getDate() + 1)

            setData(newDate)
    } 
    const decreaseDate = () => {
            const newDate = new Date(); newDate.setDate(data.getDate()); newDate.setMonth(data.getMonth()); newDate.setFullYear(data.getFullYear());
            newDate.setDate(data.getDate() - 1)

            setData(newDate)
    }

    useEffect(() => {
        fetchFoods()
    }, [data])
    
    useEffect(() => {
        updateCharts()
    }, [foodArr])

    useEffect(() => {
        fetchGoals()
    }, [])
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.pageContainer}>

                <View style={styles.headerContainer}>

                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <MaskedView style={{ width: 120, height: 40, marginLeft: 15}} maskElement={<Text  style={styles.logo}>xTracK</Text>}>
                            <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                        </MaskedView>
                        <Text style={{color: 'white', fontFamily: 'JetBrainsMono', fontSize: 12, paddingLeft: 25, paddingTop: 8}}>Welcome Back!</Text>
                    </View>
                    
                    {/*<Pressable onPress={handleSignOut} style={{marginLeft: 'auto', justifyContent: 'center', marginRight: 20,}}>
                            <Feather name="log-out" size={24} color='#B22222'/>
                    </Pressable>*/}
                </View>

                <View style={styles.macroContainer}>
                    <View style={styles.innerMacroContainer}>
                        <Text style={{color: 'white', fontFamily: 'JetBrainsMono', fontSize: 17, marginBottom: 5}}>Calories</Text> 
                        <Circle color={'#9da2b0'}thickness={6}progress={targetCal ? dailyCal/targetCal : 0} showsText={true} size={110} textStyle={styles.circleText}></Circle>
                        <Text style={{color: 'white', fontFamily: 'JetBrainsMono', fontSize: 13, marginTop: 7}}>{dailyCal}/{targetCal}</Text> 

                    </View>
                    <View style={styles.innerMacroContainer}> 
                        <View style={{display: 'flex', flexDirection: 'column', gap: 20, marginRight: 20}}>
                            <View>
                                <View style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.macroText}>Carbs</Text>
                                    <Text style={styles.smallMacroText}>{dailyCar}/{targetCar} g</Text>
                                </View>
                                <Bar color={'#43d07c'} progress={targetCar ? dailyCar/targetCar : 0}></Bar>
                            </View>
                                <View>
                                <View style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.macroText}>Protein</Text>
                                    <Text style={styles.smallMacroText}>{dailyPro}/{targetPro} g</Text>
                                </View>
                                <Bar color={'#1cc9d8'} progress={targetPro ? dailyPro/targetPro : 0}></Bar>
                            </View>
                            <View>
                                <View style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.macroText}>Fat</Text>
                                    <Text style={styles.smallMacroText}>{dailyFat}/{targetFat} g</Text>
                                </View>
                                <Bar color={'#eb3c05'} progress={targetFat ? dailyFat/targetFat : 0}></Bar>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.dateContainer}>

                    <Pressable  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} hitSlop={35} onPress={decreaseDate}><Text style={{fontFamily: 'JetBrainsMono', fontSize: 30, color: 'white', lineHeight: 40,}}>&lt;</Text></Pressable>
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, justifyContent: 'center'}}>
                        <DateTimePicker onChange={(event, Date) => {setData(Date)}} value={data} minimumDate={new Date(2024, 0, 1)} maximumDate={new Date(2035, 10, 20)} style={{width: 130}}></DateTimePicker>
                    </View>
                    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} hitSlop={35} onPress={increaseDate}><Text style={{fontFamily: 'JetBrainsMono', fontSize: 30, color: 'white', lineHeight: 40,}}>&gt;</Text></Pressable>

                </View>

                <View style={styles.foodContainer}>

                    {getDailyFood(foodArr)}

                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    logo: {
        fontSize: 35,
        fontFamily: 'JetBrainsMono',
        letterSpacing: -3,
    },
    container: {
      backgroundColor: themeColor().primary,
    },
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 70,
        borderRadius: 10,
        
    },
    macroContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 185,
        borderRadius: 10,
    },
    innerMacroContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    macroText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        fontSize: 16,
    },
    smallMacroText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        marginLeft: 'auto',
        fontSize: 12,
    },
    circleText: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: themeColor().secondary,
        width: 280,
        height: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    foodContainer: {
        backgroundColor: themeColor().primary,
        width: '95%',
        borderRadius: 30,
    },
    emptyText: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
        fontSize: 12,
        margin: 30,
        textAlign: 'center',
        opacity: 0.4,
    },
    emptyDesign: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.4,
    }
})