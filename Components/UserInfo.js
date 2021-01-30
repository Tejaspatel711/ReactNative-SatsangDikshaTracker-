import React, { useState } from 'react'
import { StyleSheet, View ,Text, Button, Alert, ActivityIndicator} from 'react-native'
import CustomButton from './CustomButton';
import firebase from  '@react-native-firebase/app';
export default function UserInfo({user,loggedInUserData}) {
    const [counter,setCounter] = useState(0);
    const [isUpdating,setIsUpdating] = useState(false);
    const increment = ()=>{
        if(counter===3){
            return;
        }
        setCounter((prev)=>{
            return prev+1;
        });
    };
    const decrement = ()=>{
        if(counter===0){
            return;
        }
        setCounter((prev)=>{
            return prev-1;
        });
    };
    const submit = async()=>{
        setIsUpdating(true);
        if(counter===0){
            setIsUpdating(false);
            return
        }
        console.log(loggedInUserData);
        await firebase.firestore().collection("Satsangi")
        .doc(loggedInUserData.uid)
        .get()
        .then(async(docSnap)=>{
            console.log(docSnap.data());
            let todaysDate = new Date().getDate();
            if(docSnap.data().todaysCount>=3 && todaysDate===docSnap.data().lastUpdate){
                Alert.alert("Max update limit reached","Take some rest till tomorrow");
                setIsUpdating(false);
                return;
            }
            let newCount = docSnap.data().count+counter;
            let newTodaysCount = docSnap.data().todaysCount+1;
            if(docSnap.data().todaysCount>=3 && todaysDate!==docSnap.data().lastUpdate){
                newTodaysCount = 0;
            }
        await firebase.firestore().collection("Satsangi")
        .doc(loggedInUserData.uid)
        .update({
            count:newCount,
            todaysCount:newTodaysCount,
            lastUpdate:new Date().getDate(),
        })
        .then(()=>Alert.alert("Succesfully Updated!","Keep Up") );
        })
        setIsUpdating(false);
    }
    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={styles.text1}> You have read Satsang Diksha : <Text style={{color:"white",fontWeight:'bold',fontSize:25}}>{loggedInUserData.count}</Text> </Text>
            </View>
            <View style={styles.incrementWrapper}>
                <Text style={styles.text2} >How many times you read today?</Text>
                <View style={styles.buttons}>
                    <CustomButton margin={10} text="-" height={40} width={70} fontSize={40} color="lightcoral" radius={10} onPress={decrement} />
                    <Text style={styles.counter}>{counter}</Text>
                    <CustomButton margin={10} text="+" height={40} width={70} fontSize={40} color="lightcoral" radius={10} onPress={increment} />
                </View>
            </View>
            <View style={styles.submit} >
                {
                    isUpdating
                    ?<ActivityIndicator size="large" color="coral"/>
                    :<CustomButton margin={10} text="Update" height={40} width={100} fontSize={20} color="peachpuff" radius={5} onPress={submit} />
                }
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        // backgroundColor:"pink",
        borderWidth:3,
        borderColor:"wheat",
        padding:15,
        borderRadius:10
        
    },
    submit:{
        margin:25,
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    buttons:{
        
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
        
    },
    counter:{
        fontSize:40,
        fontWeight:'900',
        color:"white",
    },
    incrementWrapper:{
        paddingTop:5,
    },
    text1:{
        fontSize:20,
        color:"wheat",
        textAlign:"center",
    },
    text2:{
        fontSize:22,
        color:"yellow",
        textAlign:"center",
    },
    textWrapper:{
        paddingBottom:5,
        borderBottomWidth:1,
        borderStyle:'dashed',
        borderColor:"wheat",
    }
});