
import React, { useRef, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { ActivityIndicator, Alert, Button, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import firebase from  '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
export default function Login() {
   
    const [name,setName] = useState("");
    const [mandal,setMandal] = useState("");
    const [phone,setPhone] = useState('');
    const [code,setCode] = useState('');
    const [initialCount,setInitialCount] = useState(0);
    const [confirm, setConfirm] = useState(null);
    const [codeIsSent,setCodeIsSent] = useState(false);
    const [otpIsClicked,setOtpIsClicked]=useState(false);
    const updatePhone = (text) =>{
        //console.log(text);
        var newtext = "+91"+text;
        console.log(newtext);
        setPhone(newtext);
    }
    const updateOTP = (code) =>{
        setCode(code);
    }
    const sendVerification = async ()=>{
        console.log("In send Verification");

        if(name===""){
            Alert.alert("Please feed your name");
            return;
        }
        if(name.length>25){
            Alert.alert("Please fill first & last name only");
            return;
        }
        if(mandal===""){
            Alert.alert("Please select your mandal");
            return;
        }
        setCodeIsSent(true);
        if(phone.length===13){
            console.log("Sending req")
            const confirmation = await  auth().signInWithPhoneNumber(phone).catch((err)=>console.log(err));
            console.log("This is confirmation ");
            console.log(confirmation);
            setConfirm(confirmation);
            setOtpIsClicked(true);

        }else{
            Alert.alert("Write 10 Digit number");
        }
        setCodeIsSent(false);
    };
    const confirmOTP = async ()=>{

        try {
            await confirm.confirm(code);
          } catch (error) {
            Alert.alert("Wrong Code");
            return;
          }
          
          const user = firebase.auth().currentUser;
            console.log(user)
            await user.updateProfile({
                displayName: name,
            })
            await firebase.firestore().collection('Satsangi').doc(firebase.auth().currentUser.uid)
            .set({
                uid: firebase.auth().currentUser.uid,
                name: firebase.auth().currentUser.displayName,
                //THis should be dynamic
                mandal:mandal,
                count:initialCount,
                todaysCount:0,
                lastUpdate: new Date().getDate(),

            })
            .catch(()=>{
                console.log("Error in registering to db");
            })
    };
    return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        
        <View style={styles.container}>
        
            
            <View style={styles.imageSD}>
                <Image style={styles.satsangDiksha} source={require("../assets/sd.png")} />
            </View>
            <View style={styles.imageLG}>
                    <Image style={styles.logo} source={require("../assets/logo.png")} />
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholderTextColor="#9e9a99" placeholder='Name' onChangeText={(val)=> setName(val)} />
                <TextInput style={styles.inputReadingCount} placeholderTextColor="#9e9a99" keyboardType='number-pad' 
                placeholder='Reading Count Till Now' 
                onChangeText={(val)=>  {
                    console.log(val);
                    let temp = parseInt(val);
                    console.log(initialCount);
                    setInitialCount(temp);
                    }} />
                
                <View style={styles.dropdown}>
                    <Picker selectedValue={mandal} onValueChange={(val,index)=>{setMandal(val)}} >
                        
                        <Picker.Item label="Select Mandal" value=""/>
                        <Picker.Item label="Yuva" value="Yuva"/>
                        <Picker.Item label="Yuvati" value="Yuvati"/>
                        <Picker.Item label="Mahila" value="Mahila"/>
                        <Picker.Item label="Purush" value="Purush"/>
                    </Picker>   
                </View>
                
                <TextInput style={styles.input} placeholderTextColor="#9e9a99" placeholder='Mobile No.' keyboardType="number-pad"  onChangeText={(val)=> updatePhone(val)} />
                
               
                {
                    codeIsSent
                    ?<ActivityIndicator color="coral" />
                    :otpIsClicked
                        ?<Button style={styles.button} color="coral" disabled={true} title="OTP GENERATED" onPress={sendVerification}/> 
                        :<Button style={styles.button} color="coral" title="GET OTP" onPress={sendVerification}/>
                }
                
                
               
                
                <TextInput style={styles.input} placeholderTextColor="#9e9a99" placeholder='OTP' keyboardType="number-pad" onChangeText={(val)=> updateOTP(val)} />
                <Button style={styles.button} color="coral" title="LOGIN" onPress={confirmOTP}/>
            </View>
            
            
        </View>
      
    </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#524642',
      
      justifyContent: 'center',
      
    },
    dropdown:{
        marginTop:10,
        backgroundColor:"wheat",
        borderRadius:10,
    },
    imageSD:{
        flexDirection:'row',
        justifyContent:"center",
        maxHeight:350,
    },
    satsangDiksha:{
        
        width:350,
        height:50,
        resizeMode:'contain',
    },
    imageLG:{
        
        margin:15,
        
        flexDirection:'row',
        justifyContent:"center",
        maxHeight:150,
    },
    logo:{        
        width:350,
        height:100,
        resizeMode:'contain',
    },
    form:{
        backgroundColor: '#524642',
        marginHorizontal:10,
        paddingHorizontal:30,
        paddingTop:5,
        paddingBottom:35,
        borderStyle:"dashed",
        borderWidth:1,
        borderRadius:20,
        borderColor:"wheat",
    },
    inputReadingCount:{
        marginHorizontal:5,
        marginVertical:0,
        borderBottomWidth:1,
        borderColor:"wheat",
        fontSize:20,
        color:"white",
        paddingHorizontal:30,
    },
    input:{
        marginHorizontal:10,
        marginVertical:15,
        borderBottomWidth:1,
        borderColor:"wheat",
        fontSize:20,
        color:"white",
        paddingHorizontal:30,
        
    },
    button:{
        marginTop:50,
        borderRadius:10,
        overflow:'hidden',
    },
  });