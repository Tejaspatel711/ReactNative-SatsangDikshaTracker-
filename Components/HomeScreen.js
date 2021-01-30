import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import firebase from  '@react-native-firebase/app';
import Header from './Header';
import ListItem from './ListItem';
import UserInfo from './UserInfo';

// const db = firebase.firestore();

export default function HomeScreen({user}) {
    // console.log(db.collection("Satsangi"))
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [loggedInUserData,setLoggedInUserData] = useState(null);
    useEffect(()=>{
        const subscribe = firebase.firestore().collection("Satsangi").orderBy('count','desc')
        .onSnapshot(snapshot =>{
            const temp = [];
            snapshot.forEach((docSnap)=>{
                console.log(docSnap.data());
                if(docSnap.id===user.uid){
                    console.log("loggedInUserData");
                    setLoggedInUserData(docSnap.data());
                    console.log(loggedInUserData);
                }
                temp.push({
                    ...docSnap.data(),
                    key:docSnap.id,
                });
            });
            setData(temp);
            
            setIsLoading(false);
        });
        return subscribe;
    },[]);
    

    return ( 
    <View style={styles.container}>
      {/* Heading */}
      <Header/>
      {isLoading 
        ?<ActivityIndicator size="large" color="coral"/>
        : loggedInUserData===null
            ?<ActivityIndicator size="large" color="coral"/>
            :<View style={styles.yourInfo}>         
                <UserInfo user={user} loggedInUserData={loggedInUserData}/>
                <View style={styles.currentList}>
                    <View style={styles.listHeading}>
                        <Text style={{color:"white",fontSize:25,textAlign:"center"}}>Leaderboard</Text>
                    </View>
                    <FlatList data={data} 
                        renderItem ={({item})=>{
                            return <ListItem item={item} />
                        }}
                    />
                    
                </View>     
                </View>}
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#524642',
      
    },
    yourInfo : {
        padding:20,
        // backgroundColor:"pink",
        
        flex:1,
        
    },
    listHeading:{
        borderTopWidth:5,
        borderColor:"wheat",
        // backgroundColor:"pink",
        padding:10,
    },
    currentList:{
        flex:1,
        // backgroundColor:"red",
        marginTop:15,

    }

  });